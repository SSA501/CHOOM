import torch
from torchvision import transforms

from utils.datasets import letterbox
from utils.general import non_max_suppression_kpt
from utils.plots import output_to_keypoint, plot_skeleton_kpts

import matplotlib.pyplot as plt
import cv2
import time
import codecs, json 
import numpy as np

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
print(device)

def load_model():
    model = torch.load('yolov7-w6-pose.pt', map_location=device)['model']
    # Put in inference mode
    model.float().eval()

    if torch.cuda.is_available():
        # half() turns predictions into float16 tensors
        # which significantly lowers inference time
        model.half().to(device)
    return model

model = load_model()

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

  for idx in range(output.shape[0]):
      plot_skeleton_kpts(nimg, output[idx, 7:].T, 3)

  return nimg, output[0, 7:].T

def L2_norm(x):
    x_norm = x * x
    x_norm = np.sum(x_norm)
    x_norm = np.sqrt(x_norm)
    return x_norm

def cacl_angle(pos1, pos2) :
    v = np.inner(pos1, pos2) / (L2_norm(pos1) * L2_norm(pos2))
    theta = np.arccos(v)
    return theta

def save_angle(kpts) :
    output = {}
    skeleton = [[6, 8], [8, 10], [5, 7], [7, 9], [12, 14], [14, 16], [11, 13], [13, 15], [0, 6], [0, 5]]
    names = ["ra", "rh", "ra", "rh", "rl", "rf", "ll", "lf", "rn", "ln"]

    for sk_id, sk in enumerate(skeleton):
        pos1 = np.array([int(kpts[(sk[0]-1)*3]), int(kpts[(sk[0]-1)*3+1])])
        pos2 = np.array([int(kpts[(sk[1]-1)*3]), int(kpts[(sk[1]-1)*3+1])])
        conf1 = kpts[(sk[0]-1)*3+2]
        conf2 = kpts[(sk[1]-1)*3+2]
        if conf1<0.5 or conf2<0.5:
            angle = -1
        else :
            angle = cacl_angle(pos1, pos2)
        output[names[sk_id]] = angle * 180 / 3.14
    
    return output


def pose_estimation_video(filename):
    cap = cv2.VideoCapture(filename)

    prev_time = 0
    FPS = 10
    # video FPS 지정

    file_path = "video/v3_2.json" ## your path variable
    
    json.dump([], codecs.open(file_path, 'w', encoding='utf-8'),separators=(',', ':'), 
                sort_keys=True, 
                indent=4)

    while cap.isOpened():
        (ret, frame) = cap.read()
        current_time = time.time() - prev_time
        
        if ret == True:

            if current_time > 1./ FPS :
                prev_time = time.time()
                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                output, frame = run_inference(frame)
                frame, kpts = draw_keypoints(output, frame)


                with open(file_path, 'r') as file:
                    data = json.load(file)
                data.append(kpts.tolist())
                json.dump(data, codecs.open(file_path, 'w', encoding='utf-8'), 
                separators=(',', ':'), 
                sort_keys=True, 
                indent=4) ### this saves the array in .json format

            else :
                frame = letterbox(frame, 960, stride=64, auto=True)[0]

            cv2.imshow('Pose estimation', frame)
        else:
            break

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()

pose_estimation_video('video/v3.mp4')