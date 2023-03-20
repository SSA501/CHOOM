import React, { useEffect } from "react";

import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/pose";

import { STATE } from "../../apis/params";
import { Camera } from "../../apis/context";

import { DanceVideoContainer, VideoContainer, CircleBtn } from "./style";

interface Kpt {
  x: number;
  y: number;
  z: number;
  score: number;
}
interface Pose {
  keypoints: Kpt[];
}

function DanceVideo(props: { setPoseList: (poseList: Pose[]) => void }) {
  let camera: Camera, detector: any;
  let poseList: Pose[];

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
    alert("잠시만 기다려주세요");
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

    await detector.estimatePoses(camera.video);
    alert("동영상 준비완료");
  }

  async function run(): Promise<void> {
    poseList = [];
    // Warming up pipeline.
    camera.video.pause();
    camera.video.currentTime = 0;
    camera.video.play();

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
      console.log(poseList);
      props.setPoseList(poseList);
      localStorage.setItem("poseList", JSON.stringify(poseList));
      return;
    }

    await renderResult();

    requestAnimationFrame(runFrame);
  }

  async function renderResult() {
    let poseList: any;

    // FPS only counts the time it takes to finish estimateposeList.
    poseList = await detector.estimatePoses(camera.video, {
      enableSmoothing: true,
    });
    if (poseList.length > 0) {
      const newKpts: Kpt[] = [];

      poseList[0].keypoints.map((kpt: Kpt) => {
        newKpts.push({
          x: kpt.x / 2,
          y: kpt.y / 2,
          z: kpt.z,
          score: kpt.score,
        });
        return newKpts;
      });
      poseList.push({ keypoints: newKpts });
    }
  }

  return (
    <DanceVideoContainer>
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
      </div>

      <CircleBtn id="submit" onClick={run} top="20%">
        Run
      </CircleBtn>
      <CircleBtn id="submit" onClick={run} top="40%">
        Run
      </CircleBtn>
      <CircleBtn id="submit" onClick={run} top="60%">
        Run
      </CircleBtn>
      <VideoContainer id="video">
        <source id="currentVID" src="" type="video/mp4" />
      </VideoContainer>

      <div>
        <span id="status"></span>
      </div>
    </DanceVideoContainer>
  );
}

export default DanceVideo;
