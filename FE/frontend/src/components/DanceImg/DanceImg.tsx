import React, { useState } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/pose";

import { STATE } from "../../apis/params";
import { MyImg } from "./style";

interface Kpt {
  x: number;
  y: number;
  z: number;
  score: number;
}
interface Pose {
  keypoints: Kpt[];
}

function DanceImg(props: {
  setTitle: (title: string) => void;
  setposeList: (poseList: Pose[]) => void;
}) {
  const [imageSrc, setImageSrc] = useState<string>("");

  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    props.setTitle(fileBlob.name);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result as string);
        renderResult();
        resolve();
      };
    });
  };

  async function createDetector() {
    return poseDetection.createDetector(STATE.model, STATE.detectorConfig);
  }

  async function renderResult() {
    let detector = await createDetector();
    const img = document.getElementById("img") as HTMLImageElement;
    let poseList: any;

    if (detector != null) {
      try {
        poseList = await detector.estimatePoses(img);
      } catch (error) {
        detector.dispose();
        alert(error);
      }
    }

    if (poseList && poseList.length > 0) {
      alert("분석완료");
      const newKpts: Kpt[] = [];

      poseList[0].keypoints.map((kpt: Kpt) => {
        newKpts.push({
          x: (kpt.x * 270) / img.naturalWidth,
          y: (kpt.y * 480) / img.naturalHeight,
          z: kpt.z,
          score: kpt.score,
        });
        return newKpts;
      });
      let newposeList: Pose[] = [{ keypoints: newKpts }];
      props.setposeList(newposeList);
    }
  }
  return (
    <div>
      <div className="containerImg">
        <h2>이미지 미리보기</h2>
        <input
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            encodeFileToBase64(e.target.files![0]);
          }}
        />

        {imageSrc && (
          <MyImg
            src={imageSrc}
            id="img"
            alt="preview-img"
            width="360"
            height="640"
          />
        )}
      </div>
    </div>
  );
}

export default DanceImg;
