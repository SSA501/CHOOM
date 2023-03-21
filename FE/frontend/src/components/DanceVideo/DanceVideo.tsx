import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import { CgEditFlipH } from "react-icons/cg";
import { MdVolumeUp, MdVolumeOff, MdPlayArrow } from "react-icons/md";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/pose";

import { STATE } from "../../apis/params";
import { Camera } from "../../apis/context";

import {
  DanceVideoContainer,
  VideoContainer,
  CircleBtn,
  BtnLabel,
} from "./style";

interface Kpt {
  x: number;
  y: number;
  z: number;
  score: number;
}
interface Pose {
  keypoints: Kpt[];
}

const DanceVideo = forwardRef(
  (
    props: { setPoseList: (poseList: Pose[]) => void; poseList: Pose[] },
    ref: React.ForwardedRef<any>
  ) => {
    let camera: Camera, detector: any;
    let poseList: Pose[];

    const [volumeState, setVolumeState] = useState<Boolean>(true);
    const [isFlipped, setIsFlipped] = useState(false);
    const [playRate, setplayRate] = useState("1.0");

    useEffect(() => {
      init();
    });

    useImperativeHandle(ref, () => ({
      // 부모 컴포넌트에서 사용할 함수를 선언
      playVideo,
    }));

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

      const videoWidth = 450;
      const videoHeight = 800;

      // Must set below two lines, otherwise video element doesn't show.
      camera.video.width = videoWidth;
      camera.video.height = videoHeight;

      await detector.estimatePoses(camera.video);
      alert("동영상 준비완료");
      getPoseList();
    }

    async function getPoseList(): Promise<void> {
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

    const playVideo = () => {
      // Warming up pipeline.
      camera.video.pause();
      camera.video.currentTime = 0;
      camera.video.playbackRate = parseFloat(playRate);
      camera.video.play();
    };

    async function runFrame() {
      if (camera.video.paused) {
        // video has finished.
        props.setPoseList(poseList);
        localStorage.setItem("poseList", JSON.stringify(poseList));
        return;
      }

      await renderResult();

      requestAnimationFrame(runFrame);
    }

    async function renderResult() {
      let estimatePoseList: any;

      // FPS only counts the time it takes to finish estimateposeList.
      estimatePoseList = await detector.estimatePoses(camera.video, {
        enableSmoothing: true,
      });
      if (estimatePoseList.length > 0) {
        const newKpts: Kpt[] = [];

        estimatePoseList[0].keypoints.map((kpt: Kpt) => {
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

    const handleVolumeClick = () => {
      setVolumeState(!volumeState);
    };
    const handleFlipClick = () => {
      setIsFlipped(!isFlipped);
    };

    const handlePlayRateClick = () => {
      if (playRate === "1.0") setplayRate("0.5");
      else if (playRate === "0.5") setplayRate("2.0");
      else if (playRate === "2.0") setplayRate("1.0");
    };
    useEffect(() => {
      camera.video.playbackRate = parseFloat(playRate);
    }, [playRate]);

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
        <CircleBtn id="submit" top="20%" onClick={handleFlipClick}>
          <CgEditFlipH />
        </CircleBtn>
        <BtnLabel top="29%">좌우 반전</BtnLabel>
        <CircleBtn id="submit" onClick={handleVolumeClick} top="35%">
          {volumeState ? <MdVolumeUp /> : <MdVolumeOff />}
        </CircleBtn>
        <BtnLabel top="44%">볼륨 조절</BtnLabel>
        <CircleBtn id="submit" onClick={handlePlayRateClick} top="50%">
          {playRate}
        </CircleBtn>
        <BtnLabel top="59%">배속 조절</BtnLabel>
        <CircleBtn id="submit" onClick={playVideo} top="65%">
          <MdPlayArrow />
        </CircleBtn>
        <BtnLabel top="74%">영상 재생</BtnLabel>
        <VideoContainer id="video" isFlipped={isFlipped}>
          <source id="currentVID" src="" type="video/mp4" />
        </VideoContainer>
        <div>
          <span id="status"></span>
        </div>
      </DanceVideoContainer>
    );
  }
);

export default DanceVideo;
