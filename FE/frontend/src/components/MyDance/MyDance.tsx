import React, { useRef, useEffect } from "react";

import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/pose";

import { Camera } from "../../apis/camera";
import { STATE } from "../../apis/params";

import { MyVideo, MyCanvas, StartBtn } from "./style";

function MyDance() {
  const video = useRef<HTMLVideoElement>(null);
  let camera: Camera, detector: any;

  useEffect(() => {
    init();
  });

  const init = async () => {
    camera = await Camera.setupCamera(STATE.camera);
    detector = await createDetector();
  };
  const handleStart = (): void => {
    renderPrediction();
    if (video.current) {
      video.current.style.visibility = "hidden";
    }
  };
  async function createDetector() {
    return poseDetection.createDetector(STATE.model, STATE.detectorConfig);
  }

  async function renderPrediction() {
    await renderResult();
    requestAnimationFrame(renderPrediction);
  }

  async function renderResult(): Promise<void> {
    if (camera.video.readyState < 2) {
      await new Promise<void>((resolve) => {
        camera.video.onloadeddata = () => {
          resolve();
        };
      });
    }

    let poses: any;

    if (detector != null) {
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

    if (poses && poses.length > 0) {
      camera.drawResults(poses);
    }
  }

  return (
    <div>
      <MyCanvas id="output"></MyCanvas>
      <MyVideo id="video" playsInline ref={video}></MyVideo>
      <StartBtn onClick={handleStart}>시작</StartBtn>
    </div>
  );
}

export default MyDance;
