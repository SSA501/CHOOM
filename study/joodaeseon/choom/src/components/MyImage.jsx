import React, { useState } from "react";

import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/pose";

import { STATE } from "../apis/params";

import "./MyImage.css";

export default function UploadImg(props) {
  const [imageSrc, setImageSrc] = useState("");

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
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
    const img = document.getElementById("img");
    let poses = null;

    // Detector can be null if initialization failed (for example when loading
    // from a URL that does not exist).
    if (detector != null) {
      // Detectors can throw errors, for example when using custom URLs that
      // contain a model that doesn't provide the expected output.
      try {
        poses = await detector.estimatePoses(img, {
          enableSmoothing: true,
        });
      } catch (error) {
        detector.dispose();
        detector = null;
        alert(error);
      }
    }

    if (poses && poses.length > 0) {
      alert("분석완료");
      const newKpts = [];
      poses[0].keypoints.map((kpt) => {
        newKpts.push({
          x: (kpt.x * 270) / img.width,
          y: (kpt.y * 480) / img.height,
          z: kpt.z,
          score: kpt.score,
        });
        return newKpts;
      });
      const newPoses = [{ keypoints: newKpts }];
      props.setPoses(newPoses);
      console.log(newPoses);
    }
  }

  return (
    <div>
      <div className="containerImg">
        <h2>이미지 미리보기</h2>
        <input
          type="file"
          onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
          }}
        />
        <div className="preview">
          {imageSrc && <img src={imageSrc} id="img" alt="preview-img" />}
          <canvas id="output"></canvas>
        </div>
      </div>
    </div>
  );
}
