import * as poseDetection from "@tensorflow-models/pose-detection";
import * as params from "./params";

export class Camera {
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  constructor() {
    this.video = document.getElementById("cam") as HTMLVideoElement;
    this.canvas = document.getElementById("camOutput") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d")!;
  }

  static async setupCamera(cameraParam: {
    targetFPS: number;
    sizeOption: { width: number; height: number };
  }): Promise<Camera> {
    const { targetFPS, sizeOption } = cameraParam;
    const $size = sizeOption;
    // const videoConfig = {
    //   audio: false,
    //   video: {
    //     facingMode: "user",
    //     // Only setting the video to a specified size for large screen, on
    //     // mobile devices accept the default size.
    //     width: $size.width,
    //     height: $size.height,
    //     frameRate: {
    //       ideal: targetFPS,
    //     },
    //   },
    // };
    const videoConfig = {
      audio: false,
      video: {
        facingMode: "user",
        // deviceId: {
        //   exact:
        //     "f00492628375c7b7f3ec9ccfb2d8a0851623225961f8572b58b2372e543bf045",
        // },
        // Only setting the video to a specified size for large screen, on
        // mobile devices accept the default size.
        width: $size.width,
        height: $size.height,
        frameRate: {
          ideal: targetFPS,
        },
      },
    };

    const stream = await navigator.mediaDevices.getUserMedia(videoConfig);

    const camera = new Camera();
    camera.video.srcObject = stream;

    await new Promise<void>((resolve) => {
      camera.video.onloadedmetadata = () => {
        resolve();
      };
    });

    camera.video.play();

    const videoWidth = 360;
    const videoHeight = 640;
    // Must set below two lines, otherwise video element doesn't show.
    camera.video.width = videoWidth;
    camera.video.height = videoHeight;

    camera.canvas.width = videoWidth;
    camera.canvas.height = videoHeight;

    // Because the image from camera is mirrored, need to flip horizontally.
    camera.ctx.scale(
      videoWidth / camera.video.videoWidth,
      videoHeight / camera.video.videoHeight
    );

    return camera;
  }

  drawCtx(): void {
    this.ctx.drawImage(
      this.video,
      0,
      0,
      this.video.videoWidth,
      this.video.videoHeight
    );
  }

  clearCtx(): void {
    this.ctx.clearRect(0, 0, this.video.videoWidth, this.video.videoHeight);
  }

  drawResults(poseList: any[], color: string) {
    for (const pose of poseList) {
      this.drawResult(pose, color);
    }
  }

  drawResult(pose: { keypoints: [] }, color: string) {
    if (pose.keypoints != null) {
      // this.drawKeypoints(pose.keypoints);
      this.drawSkeleton(pose.keypoints, color);
    }
  }

  drawKeypoints(keypoints: poseDetection.Keypoint[]) {
    const keypointInd = poseDetection.util.getKeypointIndexBySide(
      params.STATE.model
    );
    this.ctx.fillStyle = "Red";
    this.ctx.strokeStyle = "White";
    this.ctx.lineWidth = params.DEFAULT_LINE_WIDTH;

    for (const i of keypointInd.middle) {
      this.drawKeypoint(keypoints[i]);
    }

    this.ctx.fillStyle = "Green";
    for (const i of keypointInd.left) {
      this.drawKeypoint(keypoints[i]);
    }

    this.ctx.fillStyle = "Orange";
    for (const i of keypointInd.right) {
      this.drawKeypoint(keypoints[i]);
    }
  }

  drawScore(score: number): void {
    this.ctx.font = "italic bold 24px Arial, sans-serif";
    this.ctx.fillText(score.toString(), 10, 50);
    this.ctx.restore();
  }

  drawKeypoint(keypoint: any) {
    // If score is null, just show the keypoint.
    const score = keypoint.score != null ? keypoint.score : 1;
    const scoreThreshold = params.BLAZEPOSE_CONFIG.scoreThreshold || 0;

    if (score >= scoreThreshold) {
      const circle = new Path2D();
      circle.arc(keypoint.x, keypoint.y, params.DEFAULT_RADIUS, 0, 2 * Math.PI);
      this.ctx.fill(circle);
      this.ctx.stroke(circle);
    }
  }

  /**
   * Draw the skeleton of a body on the video.
   * @param keypoints A list of keypoints.
   */
  drawSkeleton(keypoints: any, color: string) {
    // Each poseId is mapped to a color in the color palette.

    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = params.DEFAULT_LINE_WIDTH;

    poseDetection.util
      .getAdjacentPairs(params.STATE.model)
      .forEach(([i, j]) => {
        const kp1 = keypoints[i];
        const kp2 = keypoints[j];

        // If score is null, just show the keypoint.
        const score1 = kp1.score != null ? kp1.score : 1;
        const score2 = kp2.score != null ? kp2.score : 1;
        const scoreThreshold = params.BLAZEPOSE_CONFIG.scoreThreshold || 0;

        if (
          score1 >= scoreThreshold &&
          score2 >= scoreThreshold &&
          i > 10 &&
          j > 10
        ) {
          this.ctx.beginPath();
          this.ctx.moveTo(kp1.x, kp1.y);
          this.ctx.lineTo(kp2.x, kp2.y);
          this.ctx.stroke();
        }
      });

    // 얼굴그리기
    const left = Math.sqrt(
      Math.pow(keypoints[0].x - keypoints[8].x, 2) +
        Math.pow(keypoints[0].y - keypoints[8].y, 2) +
        Math.pow(keypoints[0].z - keypoints[8].z, 2)
    );
    const right = Math.sqrt(
      Math.pow(keypoints[0].x - keypoints[7].x, 2) +
        Math.pow(keypoints[0].y - keypoints[7].y, 2) +
        Math.pow(keypoints[0].z - keypoints[7].z, 2)
    );
    const circle = new Path2D();
    circle.arc(
      (keypoints[0].x + keypoints[7].x + keypoints[8].x) / 3,
      (keypoints[0].y + keypoints[7].y + keypoints[8].y) / 3,
      (left + right) / 2,
      0,
      2 * Math.PI
    );
    this.ctx.fill(circle);
    this.ctx.stroke(circle);
  }
}
