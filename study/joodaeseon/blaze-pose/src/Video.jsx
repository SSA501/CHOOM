import React, { useEffect, useRef } from "react";

import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-core";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/pose";
import * as tf from "@tensorflow/tfjs-core";
import { Context } from "./apis/context";
import { STATE } from "./apis/params";
import { setBackendAndEnvFlags } from "./apis/util";

import "./Video.css";

export default function Video() {
  let detector, camera, stats, rafId;
  const statusElement = document.getElementById("status");
  const video = useRef();

  useEffect(() => {
    init();
  });

  const init = async () => {
    camera = new Context();

    detector = await createDetector();
  };
  function createDetector() {
    return poseDetection.createDetector(STATE.model, STATE.detectorConfig);
  }

  async function updateVideo(event) {
    // Clear reference to any previous uploaded video.
    // URL.revokeObjectURL(camera.video.currentSrc);
    const file = event.target.files[0];
    console.log(file);
    camera.source.src = URL.createObjectURL(file);

    // Wait for video to be loaded.
    camera.video.load();
    await new Promise((resolve) => {
      camera.video.onloadeddata = () => {
        resolve(video);
      };
    });

    const videoWidth = camera.video.videoWidth;
    const videoHeight = camera.video.videoHeight;
    // Must set below two lines, otherwise video element doesn't show.
    camera.video.width = videoWidth;
    camera.video.height = videoHeight;
    camera.canvas.width = videoWidth;
    camera.canvas.height = videoHeight;
  }

  async function renderResult() {
    const poses = await detector.estimatePoses(camera.video, {
      maxPoses: STATE.modelConfig.maxPoses,
      flipHorizontal: false,
    });

    camera.drawCtx();

    // The null check makes sure the UI is not in the middle of changing to a
    // different model. If during model change, the result is from an old
    // model, which shouldn't be rendered.
    if (poses.length > 0 && !STATE.isModelChanged) {
      camera.drawResults(poses);
    }
  }

  async function checkGuiUpdate() {
    if (STATE.isModelChanged || STATE.isFlagChanged || STATE.isBackendChanged) {
      STATE.isModelChanged = true;

      window.cancelAnimationFrame(rafId);

      detector.dispose();

      if (STATE.isFlagChanged || STATE.isBackendChanged) {
        await setBackendAndEnvFlags(STATE.flags, STATE.backend);
      }

      detector = await createDetector(STATE.model);
      STATE.isFlagChanged = false;
      STATE.isBackendChanged = false;
      STATE.isModelChanged = false;
    }
  }

  async function runFrame() {
    await checkGuiUpdate();
    if (camera.video.paused) {
      // video has finished.
      camera.mediaRecorder.stop();
      camera.clearCtx();
      camera.video.style.visibility = "visible";
      return;
    }
    await renderResult();
    rafId = requestAnimationFrame(runFrame);
  }

  async function run() {
    // Warming up pipeline.
    const [runtime, $backend] = STATE.backend.split("-");

    if (runtime === "tfjs") {
      const warmUpTensor = tf.fill(
        [camera.video.height, camera.video.width, 3],
        0,
        "float32"
      );
      await detector.estimatePoses(warmUpTensor, {
        maxPoses: STATE.modelConfig.maxPoses,
        flipHorizontal: false,
      });
      warmUpTensor.dispose();
      statusElement.innerHTML = "Model is warmed up.";
    }

    camera.video.style.visibility = "hidden";
    camera.video.pause();
    video.currentTime = 0;
    camera.video.play();
    camera.mediaRecorder.start();

    console.log("11111");

    await runFrame();
  }

  return (
    <div id="main">
      <div className="container">
        <div id="top-bar">
          <label>Upload a video file:</label>
          <input
            type="file"
            id="videofile"
            name="video"
            accept="video/*"
            onChange={(e) => updateVideo(e)}
          />
          <button id="submit" onClick={(e) => run()}>
            Run
          </button>
        </div>
      </div>
      <div className="container" id="canvas-wrapper">
        <canvas id="output"></canvas>
        <video id="mp4">
          <source id="currentVID" src="" type="video/mp4" />
        </video>
      </div>
      <div className="container">
        <span id="status"></span>
      </div>
    </div>
  );
}
