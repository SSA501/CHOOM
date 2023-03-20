import * as poseDetection from "@tensorflow-models/pose-detection";

export const DEFAULT_LINE_WIDTH = 10;
export const DEFAULT_RADIUS = 4;

export const STATE = {
  model: poseDetection.SupportedModels.BlazePose,
  camera: { targetFPS: 25, sizeOption: { width: 270, height: 480 } },
  detectorConfig: {
    runtime: "mediapipe" as "mediapipe",
    solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/pose",
    // or 'base/node_modules/@mediapipe/pose' in npm.
  },
};

export const BLAZEPOSE_CONFIG = {
  maxPoses: 1,
  type: "full",
  scoreThreshold: 0.1,
  render3D: false,
};
