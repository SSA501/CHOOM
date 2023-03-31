import React, { useRef, useEffect, useState } from "react";
import CircleBtn from "../Btn/CircleBtn";
import TimerBtn from "../Btn/TimerBtn";
import { MainContainer, BtnContainer } from "../Dance/style";
import { CamContainer, MyCam, MyCanvas } from "./style";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { MdPlayCircleOutline } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
  myUrl?: string;
  setMyUrl: (myUrl: string) => void;
  setScoreList: (socreList: Score[]) => void;
  setScore: (score: number) => void;
  setMyBlob: (blob: Blob) => void;
}) {
  const cam = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const similarity = require("cosine-similarity");
  const [timer, setTimer] = useState(2);
  const [isGuide, setIsGuide] = useState(true);

  let ctx: CanvasRenderingContext2D = canvas.current?.getContext("2d")!;
  let mediaRecorder: MediaRecorder;
  let countFrame: number = 0;
  let startTime: Date;
  let scoreTemp: number = 0;
  let sumScore: number = 0;
  let countScore: number = 0;
  let scoreTempList: Score[] = [];
  let stream: MediaStream;

  useEffect(() => {
    setupCam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  // 웹캠연결
  const setupCam = async () => {
    stream = await navigator.mediaDevices.getUserMedia(VIDEO_CONFIG);
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
      props.setMyBlob(blob);
    }
  };

  const delay = (ms: number) => {
    let now = 0;
    let degree = 2;
    let time = ms / 1000;
    return new Promise<void>((resolve) => {
      const interver = setInterval(() => {
        if (now < ms) {
          drawCtx();
          now += 10; // 1씩 증가
          degree -= 20 / ms;
          if (now % 1000 === 0) time -= 1;
          if (time > 0) drawTimer(degree, time);
        } else {
          clearInterval(interver);
          resolve(); // 점수가 도달하면 타이머를 중지
        }
      }, 10); // 10밀리초마다 실행
    });
  };
  // 시작버튼 누르면
  const handleStartBtnClick = async () => {
    cam.current!.style.visibility = "hidden";

    await delay(timer * 1000);

    // 배우고 싶은 영상 재생
    await props.danceVideoRef.current.playVideo();
    // 녹화시작
    mediaRecorder?.start();

    startTime = new Date();
    renderPrediction();
  };

  // frame당 포즈예측
  const renderPrediction = async () => {
    // await renderResult();
    // countFrame++;
    // if (countFrame < props.poseList.length) {
    //   requestAnimationFrame(renderPrediction);
    // } else {
    //   // 녹화종료
    //   props.setScore(Math.round(sumScore / scoreTempList.length));
    //   props.setScoreList(scoreTempList);

    //   mediaRecorder?.stop();
    //   if (cam.current) {
    //     cam.current.srcObject = null;
    //   }
    //   const tracks = stream.getTracks();
    //   tracks.forEach((track) => track.stop());
    //   return;
    // }
    const poseDetection = setInterval(() => {
      if (countFrame < props.poseList.length) {
        renderResult();
        console.log(countFrame);
        countFrame++;
      } else {
        clearInterval(poseDetection);
      }
    }, 100);
  };

  const renderResult = async () => {
    const estimatePoseList = await props.detector.estimatePoses(cam.current!);
    drawCtx();

    const videoPose = props.poseList[countFrame];
    isGuide && drawGuide(videoPose.keypoints, PALLETE.green);

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
      countScore += 1;

      const timeTemp = new Date();
      if (
        (timeTemp.getTime() - startTime.getTime()) / 1000 >
        scoreTempList.length + 1
      ) {
        scoreTempList.push({
          score: Math.round(scoreTemp / countScore),
          time: Math.round(
            (timeTemp.getTime() - startTime.getTime()) / 1000 - 1
          ),
        });
        sumScore += Math.round(scoreTemp / countScore);
        scoreTemp = 0;
        countScore = 0;
      }

      isGuide && reverseGuide(newKptList, PALLETE.red);
      if (scoreTempList.length > 0)
        drawScore(scoreTempList[scoreTempList.length - 1].score);
    }
  };

  // 캠 그리기
  const drawCtx = (): void => {
    ctx.drawImage(cam.current!, 0, 0, 450, 800);

    // x 축을 반전하기 위해 scale 메서드를 사용
    ctx.scale(-1, 1);

    // 이미지의 너비를 음수로 지정하여 x 축을 반전
    ctx.drawImage(cam.current!, -450, 0, 450, 800);

    // 다시 scale을 사용하여 원래대로 돌려놓기
    ctx.scale(-1, 1);
  };
  const reverseGuide = (keypoints: poseDetection.Keypoint[], color: string) => {
    ctx.save(); // 현재 캔버스 상태를 저장합니다.

    // 캔버스의 원점을 중심으로 30도 회전시킵니다.
    ctx.translate(225, 100);
    ctx.scale(-1, 1);
    ctx.translate(-225, -100);

    drawGuide(keypoints, color);

    ctx.restore();
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

  // 점수 그리기
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

  // 타이머
  const handelTimerClick = () => {
    console.log(timer);
    timer === 2 && setTimer(5);
    timer === 5 && setTimer(2);
  };

  const drawTimer = (degree: number, time: number) => {
    ctx.lineWidth = 10;
    ctx.strokeStyle = "white";
    const circle = new Path2D();
    circle.arc(250, 100, 50, 0, degree * Math.PI);

    ctx.save(); // 현재 캔버스 상태를 저장합니다.

    // 캔버스의 원점을 중심으로 30도 회전시킵니다.
    ctx.translate(225, 100);
    ctx.scale(-1, 1);
    ctx.rotate((-90 * Math.PI) / 180);
    ctx.translate(-225, -100);

    ctx.stroke(circle);

    ctx.restore(); // 이전 캔버스 상태로 되돌립니다.

    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "White";
    ctx.font = "italic bold 48px Arial, sans-serif";
    ctx.fillText(time.toString(), 210, 92);
    ctx.strokeText(time.toString(), 210, 92);
  };

  const handleGuideClick = () => {
    setIsGuide(!isGuide);
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
          icon={isGuide ? AiOutlineEye : AiOutlineEyeInvisible}
          onClick={handleGuideClick}
          label={"가이드"}
          disabled={props.poseList.length === 0 ? "disabled" : ""}
        />
        <TimerBtn
          time={timer}
          onClick={handelTimerClick}
          disabled={props.poseList.length === 0 ? "disabled" : ""}
        />
      </BtnContainer>
    </MainContainer>
  );
}

export default DanceCam;
