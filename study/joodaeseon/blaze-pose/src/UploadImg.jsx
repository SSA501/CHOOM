import React, { useState } from "react";

import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/pose";

import { STATE } from "./apis/params";

import "./UploadImg.css";

export default function UploadImg(props) {
  const [imageSrc, setImageSrc] = useState("");

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        renderResult(reader.result);
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
      const kpts = [];
      poses[0].keypoints.map((kpt) => {
        const norm = Math.sqrt(kpt.x * kpt.x + kpt.y * kpt.y + kpt.z * kpt.z);
        const kptNorm = { x: kpt.x / norm, y: kpt.y / norm, z: kpt.z / norm };
        kpts.push(kptNorm);
      });
      props.setPoses(kpts);

      alert("분석완료");
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
        </div>
      </div>
    </div>
  );
}
