import torch
from torchvision import transforms
import matplotlib.pyplot as plt
from utils.datasets import letterbox
from utils.general import non_max_suppression_kpt
from utils.plots import output_to_keypoint, plot_skeleton_kpts
from sklearn.metrics.pairwise import cosine_similarity

import cv2
import numpy as np

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

# 모델 불러오기
def load_model():
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    model = torch.load('yolov7-w6-pose.pt', map_location=device)['model']
    # Put in inference mode
    model.float().eval()

    if torch.cuda.is_available():
        # half() turns predictions into float16 tensors
        # which significantly lowers inference time
        model.half().to(device)
    return model

model = load_model()

# 이게뭐냐
def run_inference(image):
    # Resize and pad image
    image = letterbox(image, 960, stride=64, auto=True)[0] # shape: (567, 960, 3)
    # Apply transforms
    image = transforms.ToTensor()(image) # torch.Size([3, 567, 960])
    if torch.cuda.is_available():
      image = image.half().to(device)
    # Turn image into batch
    image = image.unsqueeze(0) # torch.Size([1, 3, 567, 960])
    with torch.no_grad():
      output, _ = model(image)
    return output, image

# 뼈대 그리기?
def draw_keypoints(output, image):
  output = non_max_suppression_kpt(output, 
                                     0.25, # Confidence Threshold
                                     0.65, # IoU Threshold
                                     nc=model.yaml['nc'], # Number of Classes
                                     nkpt=model.yaml['nkpt'], # Number of Keypoints
                                     kpt_label=True)
  with torch.no_grad():
        output = output_to_keypoint(output)
  nimg = image[0].permute(1, 2, 0) * 255
  nimg = nimg.cpu().numpy().astype(np.uint8)
  nimg = cv2.cvtColor(nimg, cv2.COLOR_RGB2BGR)
  plot_skeleton_kpts(nimg, output[0, 7:].T, 3)
  kpt = output[0, 7:].T

  return nimg, kpt

# np.linalg.norm을 이용해도 구현할 수 있다.
def L2_norm(x):
    x_norm = x * x
    x_norm = np.sum(x_norm)
    x_norm = np.sqrt(x_norm)
    return x_norm

def angle(x, y):
    v = np.inner(x, y) / (L2_norm(x) * L2_norm(y))
    theta = np.arccos(v)
    return theta * 180 / 3.14

def compare_vector(kpt1, kpt2) :
    x1_1, y1_1, conf1 = kpt1[3 * 8], kpt1[3 * 8 + 1], kpt1[3 * 8 + 2]
    x2_1, y2_1, conf2 = kpt2[3 * 8], kpt2[3 * 8 + 1], kpt2[3 * 8 + 2]

    x1_2, y1_2 = kpt1[3 * 10], kpt1[3 * 10 + 1]
    x2_2, y2_2 = kpt2[3 * 10], kpt2[3 * 10 + 1]

    if conf1 > 0.5 and conf2 > 0.5:
        v1 = np.array([x1_1 - x1_2, y1_1 - y1_2])
        v2 = np.array([x2_1 - x2_2, y2_1 - y2_2])
        print(angle(v1, v2))



# 포즈
def pose_estimation_video(filename):
    cap = cv2.VideoCapture(filename)
    # VideoWriter for saving the video
    fourcc = cv2.VideoWriter_fourcc(*'MP4V')
    out = cv2.VideoWriter('ice_skating_output.mp4', fourcc, 30.0, (int(cap.get(3)), int(cap.get(4))))
    while cap.isOpened():
        (ret, frame) = cap.read()
        if ret == True:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            output, frame = run_inference(frame)
            frame, kpt = draw_keypoints(output, frame)



            frame = cv2.resize(frame, (int(cap.get(3)), int(cap.get(4))))
            out.write(frame)
            cv2.imshow('Pose estimation', frame)
        else:
            break

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cap.release()
    out.release()
    cv2.destroyAllWindows()


def pose_estimation_comparison(video1_path, video2_path):
    # Load the videos
    cap1 = cv2.VideoCapture(video1_path)
    cap2 = cv2.VideoCapture(video2_path)
    # VideoWriter for saving the video

    while cap1.isOpened() and cap2.isOpened():
        # Read the frames
        ret1, frame1 = cap1.read()
        ret2, frame2 = cap2.read()
        if ret1 and ret2:
            # Convert the frames to RGB format
            frame1 = cv2.cvtColor(frame1, cv2.COLOR_BGR2RGB)
            frame2 = cv2.cvtColor(frame2, cv2.COLOR_BGR2RGB)
            # Run inference on the frames using the `run_inference` function
            output1, frame1 = run_inference(frame1)
            output2, frame2 = run_inference(frame2)
            # Draw keypoints on the frames using the `draw_keypoints` function
            frame1, kpt1 = draw_keypoints(output1, frame1)
            frame2, kpt2 = draw_keypoints(output2, frame2)
            compare_vector(kpt1, kpt2)


            frame1 = cv2.resize(frame1, (int(cap1.get(3)), int(cap1.get(4))))
            cv2.imshow('Pose1', frame1)
            frame2 = cv2.resize(frame2, (int(cap2.get(3)), int(cap2.get(4))))
            cv2.imshow('Pose2', frame2)
        
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

pose_estimation_comparison("video/v1.mp4", "video/v2.mp4")