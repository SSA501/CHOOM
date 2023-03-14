import React from "react";

import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/pose";

import { Camera } from "../../apis/camera";
import { STATE } from "../../apis/params";

function MyDance() {
  const camera = Camera.setupCamera(STATE.camera);

  return (
    <div>
      <div className="container">
        <div className="canvas-wrapper">
          <canvas id="output"></canvas>
          <video id="video" playsInline></video>
        </div>
        <div id="scatter-gl-container"></div>
      </div>
      <button>시작</button>
      <button>종료</button>
    </div>
  );
}

export default MyDance;
