import React, { useEffect } from "react";

import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/pose";

import { STATE } from "../../apis/params";
import { Camera } from "../../apis/camera";

import { VideoContainer, MyCanvas } from "./style";

interface Kpt {
  x: number;
  y: number;
  z: number;
  score: number;
}
interface Pose {
  keypoints: Kpt[];
}

function MyVideo() {
  let camera: Camera, detector: any;

  useEffect(() => {
    init();
  });

  const init = async () => {
    camera = new Camera();
    detector = await createDetector();
  };

  async function createDetector() {
    return poseDetection.createDetector(STATE.model, STATE.detectorConfig);
  }
  async function updateVideo(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    alert("동영상을 update 했습니다");
    // Clear reference to any previous uploaded video.
    URL.revokeObjectURL(camera.video.currentSrc);
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file !== undefined) camera.source.src = URL.createObjectURL(file);
    else alert("file이 잘못된듯?");

    // Wait for video to be loaded.
    camera.video.load();
    await new Promise<void>((resolve) => {
      camera.video.onloadedmetadata = () => {
        resolve();
      };
    });

    const videoWidth = 360;
    const videoHeight = 640;

    // Must set below two lines, otherwise video element doesn't show.
    camera.video.width = videoWidth;
    camera.video.height = videoHeight;
    camera.canvas.width = videoWidth;
    camera.canvas.height = videoHeight;
  }

  async function run(): Promise<void> {
    // Warming up pipeline.
    camera.video.style.visibility = "hidden";
    camera.video.pause();
    camera.video.currentTime = 0;
    camera.video.play();
    //
    camera.ctx.scale(0.5, 0.5);

    await new Promise<void>((resolve) => {
      camera.video.onseeked = () => {
        resolve();
      };
    });

    await runFrame();
  }

  async function runFrame() {
    if (camera.video.paused) {
      // video has finished.
      camera.clearCtx();
      camera.video.style.visibility = "visible";
      return;
    }
    await renderResult();
    requestAnimationFrame(runFrame);
  }

  async function renderResult() {
    let poses: any;

    // FPS only counts the time it takes to finish estimatePoses.
    poses = await detector.estimatePoses(camera.video, {
      enableSmoothing: true,
    });
    camera.drawCtx();
    if (poses.length > 0) {
      camera.drawResults(poses, "rgba(255,0,0,0.5)");
    }
  }

  return (
    <div>
      <div>
        <div id="top-bar">
          <input
            type="file"
            id="videofile"
            name="video"
            accept="video/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              updateVideo(e);
            }}
          />
          <button id="submit" onClick={run}>
            Run
          </button>
        </div>
      </div>

      <MyCanvas id="output"></MyCanvas>
      <VideoContainer id="video">
        <source id="currentVID" src="" type="video/mp4" />
      </VideoContainer>

      <div>
        <span id="status"></span>
      </div>
    </div>
  );
}

export default MyVideo;
