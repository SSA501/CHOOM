import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircleBtn from "../CircleBtn/CircleBtn";
import { MainContainer, BtnContainer } from "../Dance/style";
import { CamContainer, MyCam, MyCanvas } from "./style";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { MdPlayCircleOutline, MdTimer3 } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";

interface Pose {
  keypoints: poseDetection.Keypoint[];
}
interface Score {
  score: number;
  time: number;
}

const VIDEO_CONFIG = {
  audio: false,
  video: {
    facingMode: "user",
    width: 270,
    height: 480,
    frameRate: {
      ideal: 25,
    },
  },
};
const BLAZEPOSE_CONFIG = {
  maxposeList: 1,
  type: "full",
  scoreThreshold: 0.1,
  render3D: false,
};
const JOINTS = [
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

const PALLETE = {
  red: "rgba(255, 0, 0, 0.5)",
  green: "rgba(0,255,0,0.5)",
};

function DanceCam(props: {
  danceVideoRef: React.MutableRefObject<any>;
  detector: poseDetection.PoseDetector;
  poseList: Pose[];
  setMyUrl: (myUrl: string) => void;
  setScoreList: (socreList: Score[]) => void;
}) {
  const cam = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const similarity = require("cosine-similarity");

  let ctx: CanvasRenderingContext2D = canvas.current?.getContext("2d")!;
  let mediaRecorder: MediaRecorder;
  let countFrame: number;
  let startTime: Date;
  let timeTemp: Date;
  let scoreTemp: number = 0;
  let scoreTempList: Score[] = [];

  const navigate = useNavigate();

  useEffect(() => {
    setupCam();
  });

  // 웹캠연결
  const setupCam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(VIDEO_CONFIG);
    cam.current!.srcObject = stream;

    const options = { mimeType: "video/webm" };
    mediaRecorder = new MediaRecorder(stream, options);
    mediaRecorder.ondataavailable = (event: BlobEvent) =>
      handleDataAvailable(event);

    // 비디오가 load 될때까지 기다림
    await new Promise<void>((resolve) => {
      cam.current!.onloadedmetadata = () => {
        resolve();
      };
    });

    cam.current!.play();
    ctx = canvas.current?.getContext("2d")!;
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      const recordedChunks = [event.data];
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      props.setMyUrl(url);
      navigate("/dance/result");
    }
  };

  // 시작버튼 누르면
  const handleStartBtnClick = async () => {
    // 배우고 싶은 영상 재생
    await props.danceVideoRef.current.playVideo();
    // 녹화시작
    mediaRecorder?.start();
    startTime = new Date();
    countFrame = 0;
    renderPrediction();
    cam.current!.style.visibility = "hidden";
  };

  // frame당 포즈예측
  const renderPrediction = async () => {
    await renderResult();
    countFrame++;
    if (countFrame < props.poseList.length) {
      requestAnimationFrame(renderPrediction);
    } else {
      // 녹화종료
      props.setScoreList(scoreTempList);
      mediaRecorder?.stop();
      return;
    }
  };

  const renderResult = async () => {
    const estimatePoseList = await props.detector.estimatePoses(cam.current!);
    drawCtx();

    const videoPose = props.poseList[countFrame];
    drawGuide(videoPose.keypoints, PALLETE.green);

    if (estimatePoseList && estimatePoseList.length > 0) {
      const newKptList: poseDetection.Keypoint[] = [];
      estimatePoseList[0].keypoints.map((kpt: poseDetection.Keypoint) => {
        newKptList.push({
          x: (kpt.x * 450) / cam.current?.videoWidth!,
          y: (kpt.y * 800) / cam.current?.videoHeight!,
          z: kpt.z,
          score: kpt.score,
        });
        return newKptList;
      });
      const score = calculateScore(newKptList, videoPose.keypoints);
      scoreTemp += score;

      if (countFrame % 40 === 0) timeTemp = new Date();

      if (countFrame % 40 === 39) {
        scoreTempList.push({
          score: Math.round(scoreTemp / 40),
          time: (timeTemp.getTime() - startTime.getTime()) / 1000,
        });
        scoreTemp = 0;
      }
      drawGuide(newKptList, PALLETE.red);
      if (scoreTempList.length > 0)
        drawScore(scoreTempList[scoreTempList.length - 1].score);
    }
  };

  // 캠 그리기
  const drawCtx = (): void => {
    ctx.drawImage(cam.current!, 0, 0, 450, 800);
  };

  // Guide그리기
  const drawGuide = (keypoints: poseDetection.Keypoint[], color: string) => {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;

    poseDetection.util
      .getAdjacentPairs(poseDetection.SupportedModels.BlazePose)
      .forEach(([i, j]) => {
        const kp1 = keypoints[i];
        const kp2 = keypoints[j];

        const score1 = kp1.score != null ? kp1.score : 1;
        const score2 = kp2.score != null ? kp2.score : 1;
        const scoreThreshold = BLAZEPOSE_CONFIG.scoreThreshold || 0;

        if (
          score1 >= scoreThreshold &&
          score2 >= scoreThreshold &&
          i > 10 &&
          j > 10
        ) {
          ctx.beginPath();
          ctx.moveTo(kp1.x, kp1.y);
          ctx.lineTo(kp2.x, kp2.y);
          ctx.stroke();
        }
      });

    // 얼굴그리기
    const left = Math.sqrt(
      Math.pow(keypoints[0].x - keypoints[8].x, 2) +
        Math.pow(keypoints[0].y - keypoints[8].y, 2) +
        Math.pow(keypoints[0].z! - keypoints[8].z!, 2)
    );
    const right = Math.sqrt(
      Math.pow(keypoints[0].x - keypoints[7].x, 2) +
        Math.pow(keypoints[0].y - keypoints[7].y, 2) +
        Math.pow(keypoints[0].z! - keypoints[7].z!, 2)
    );
    const circle = new Path2D();
    circle.arc(
      (keypoints[0].x + keypoints[7].x + keypoints[8].x) / 3,
      (keypoints[0].y + keypoints[7].y + keypoints[8].y) / 3,
      (left + right) / 2,
      0,
      2 * Math.PI
    );
    ctx.fill(circle);
    ctx.stroke(circle);
  };

  // 점수 계산
  const calculateScore = (
    keypoints1: poseDetection.Keypoint[],
    keypoints2: poseDetection.Keypoint[]
  ) => {
    let sum = 0;
    let pose1ConfidenceSum = 0;
    JOINTS.map((joint) => {
      const v1 = {
        x: keypoints1[joint[0]].x - keypoints1[joint[1]].x,
        y: keypoints1[joint[0]].y - keypoints1[joint[1]].y,
        z: keypoints1[joint[0]].z! - keypoints1[joint[1]].z!,
      };
      const v2 = {
        x: keypoints2[joint[0]].x - keypoints2[joint[1]].x,
        y: keypoints2[joint[0]].y - keypoints2[joint[1]].y,
        z: keypoints2[joint[0]].z! - keypoints2[joint[1]].z!,
      };
      const pose1Confidence =
        (keypoints1[joint[0]].score! + keypoints1[joint[1]].score!) / 2;
      pose1ConfidenceSum += pose1Confidence;
      const norm_v1 = l2_norm(v1);
      const norm_v2 = l2_norm(v2);
      let tempSum = similarity(norm_v1, norm_v2) * pose1Confidence;
      sum += tempSum;
      return sum;
    });

    let avg = sum / pose1ConfidenceSum;
    if (avg < 0) avg = 0;
    return avg * 100;
  };

  const l2_norm = (kpt: { x: number; y: number; z: number }) => {
    const norm = Math.sqrt(kpt.x * kpt.x + kpt.y * kpt.y + kpt.z * kpt.z);
    return { x: kpt.x / norm, y: kpt.y / norm, z: kpt.z / norm };
  };

  const drawScore = (score: number): void => {
    score > 80
      ? (ctx.fillStyle = "Green")
      : score < 20
      ? (ctx.fillStyle = "Red")
      : (ctx.fillStyle = "Black");

    ctx.lineWidth = 1;
    ctx.strokeStyle = ctx.fillStyle;

    const circle = new Path2D();
    circle.arc(225, 42, 24, 0, 2 * Math.PI);
    ctx.fill(circle);
    ctx.stroke(circle);

    ctx.fillStyle = "White";
    ctx.font = "italic bold 24px Arial, sans-serif";
    ctx.fillText(score.toString(), 210, 50);
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
          onClick={handleStartBtnClick}
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
