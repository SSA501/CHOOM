import React, { useEffect, useRef } from "react";

import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/pose";

import { Camera } from "../apis/camera";
import { STATE } from "../apis/params";

import "./MyVideo.css";

export default function App(props) {
  const video = useRef();
  let camera, detector;

  useEffect(() => {
    init();
  });

  const init = async () => {
    camera = await Camera.setupCamera(STATE.camera);
    detector = await createDetector();
  };

  const handleStart = () => {
    renderPrediction();
    video.current.style.visibility = "hidden";
  };

  async function createDetector() {
    return poseDetection.createDetector(STATE.model, STATE.detectorConfig);
  }

  async function renderPrediction() {
    if (!STATE.isModelChanged) {
      await renderResult();
    }

    requestAnimationFrame(renderPrediction);
  }

  async function renderResult() {
    if (camera.video.readyState < 2) {
      await new Promise((resolve) => {
        camera.video.onloadeddata = () => {
          resolve(video);
        };
      });
    }

    let poses = null;

    // Detector can be null if initialization failed (for example when loading
    // from a URL that does not exist).
    if (detector != null) {
      // Detectors can throw errors, for example when using custom URLs that
      // contain a model that doesn't provide the expected output.
      try {
        poses = await detector.estimatePoses(camera.video, {
          enableSmoothing: true,
        });
      } catch (error) {
        detector.dispose();
        detector = null;
        alert(error);
      }
    }

    camera.drawCtx();

    // The null check makes sure the UI is not in the middle of changing to a
    // different model. If during model change, the result is from an old model,
    // which shouldn't be rendered.
    if (poses && poses.length > 0) {
      camera.drawResults(props.poses);
      camera.drawResults(poses);
      const score = getSmularity(props.poses, poses);
      camera.drawScore(score);
    }
  }
  const similarity = require("cosine-similarity");
  const joints = [
    [8, 12],
    [7, 11],
    [8, 7],
    [12, 14],
    [16, 14],
    [16, 20],
    [16, 18],
    [11, 13],
    [13, 15],
    [15, 19],
    [15, 17],
    [12, 11],
    [12, 24],
    [11, 23],
    [24, 23],
    [24, 26],
    [26, 28],
    [28, 32],
    [28, 30],
    [23, 25],
    [25, 27],
    [27, 29],
    [27, 31],
  ];
  const getSmularity = (pose1, pose2) => {
    let sum = 0;
    let pose1ConfidenceSum = 0;
    joints.map((joint) => {
      const v1 = {
        x: pose1[0].keypoints[joint[0]].x - pose1[0].keypoints[joint[1]].x,
        y: pose1[0].keypoints[joint[0]].y - pose1[0].keypoints[joint[1]].y,
        z: pose1[0].keypoints[joint[0]].z - pose1[0].keypoints[joint[1]].z,
      };
      const v2 = {
        x: pose2[0].keypoints[joint[0]].x - pose2[0].keypoints[joint[1]].x,
        y: pose2[0].keypoints[joint[0]].y - pose2[0].keypoints[joint[1]].y,
        z: pose2[0].keypoints[joint[0]].z - pose2[0].keypoints[joint[1]].z,
      };
      const pose1Confidence =
        (pose1[0].keypoints[joint[0]].score +
          pose1[0].keypoints[joint[1]].score) /
        2;
      pose1ConfidenceSum += pose1Confidence;
      const norm_v1 = l2_norm(v1);
      const norm_v2 = l2_norm(v2);
      let tempSum = similarity(norm_v1, norm_v2) * pose1Confidence;
      sum += tempSum;
      return sum;
    });

    let avg = sum / pose1ConfidenceSum;
    if (avg < 0) avg = 0;
    console.log(Math.round(avg * 100));
    return Math.round(avg * 100);
  };

  const l2_norm = (kpt) => {
    const norm = Math.sqrt(kpt.x * kpt.x + kpt.y * kpt.y + kpt.z * kpt.z);
    return { x: kpt.x / norm, y: kpt.y / norm, z: kpt.z / norm };
  };

  return (
    <div className="app">
      <div id="main">
        <div className="container">
          <div className="canvas-wrapper">
            <canvas id="output"></canvas>
            <video id="video" playsInline ref={video}></video>
          </div>
          <div id="scatter-gl-container"></div>
        </div>
        <button onClick={handleStart}>시작</button>
        <button>종료</button>
      </div>
    </div>
  );
}
