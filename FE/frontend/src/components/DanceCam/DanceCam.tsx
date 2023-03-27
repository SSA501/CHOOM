import React, { useRef, useEffect } from "react";

import CircleBtn from "../CircleBtn/CircleBtn";
import { MainContainer, BtnContainer } from "../Dance/style";
import { CamContainer, MyCam, MyCanvas } from "./style";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { MdPlayCircleOutline, MdTimer3 } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";

interface Pose {
  keypoints: poseDetection.Keypoint[];
}

function DanceCam(props: {
  danceVideoRef: React.MutableRefObject<any>;
  detector: poseDetection.PoseDetector;
  poseList: Pose[];
}) {
  const cam = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const VIDEO_CONFIG = {
    audio: false,
    video: {
      facingMode: "user",
      width: 270,
      height: 480,
      frameRate: {
        ideal: 30,
      },
    },
  };

  useEffect(() => {
    setupCam();
  });

  // 웹캠연결
  const setupCam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(VIDEO_CONFIG);
    cam.current!.srcObject = stream;

    const options = { mimeType: "video/webm" };
    const mediaRecorder = new MediaRecorder(stream, options);

    // 비디오가 load 될때까지 기다림
    await new Promise<void>((resolve) => {
      cam.current!.onloadedmetadata = () => {
        resolve();
      };
    });

    cam.current!.play();
  };

  // 시작버튼 누르면
  const handleStartClick = async () => {
    await props.danceVideoRef.current.playVideo();

    renderPrediction();
    cam.current!.style.visibility = "hidden";
  };

  // frame당 포즈예측
  const renderPrediction = async () => {
    await renderResult();
    requestAnimationFrame(renderPrediction);
  };

  const renderResult = async () => {
    let estimatePoseList: any;

    if (props.detector != null) {
      try {
        estimatePoseList = await props.detector.estimatePoses(cam.current!);
      } catch (error) {
        props.detector.dispose();
        alert(error);
      }
    }

    if (estimatePoseList && estimatePoseList.length > 0) {
      console.log(estimatePoseList);
    }
  };

  return (
    <MainContainer>
      <CamContainer>
        <MyCanvas width={450} height={800} ref={canvas} />
        <MyCam width={450} height={800} ref={cam} />
      </CamContainer>
      <BtnContainer>
        <CircleBtn
          icon={MdPlayCircleOutline}
          label={"녹화 시작"}
          onClick={handleStartClick}
          disabled={props.poseList.length === 0 ? "disabled" : ""}
        />
        <CircleBtn
          icon={AiOutlineEye}
          label={"가이드"}
          disabled={props.poseList.length === 0 ? "disabled" : ""}
        />
        <CircleBtn
          icon={MdTimer3}
          label={"타이머"}
          disabled={props.poseList.length === 0 ? "disabled" : ""}
        />
      </BtnContainer>
    </MainContainer>
  );
}

export default DanceCam;
