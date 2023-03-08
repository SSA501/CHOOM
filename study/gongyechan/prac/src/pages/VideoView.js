import React, { useState, useRef } from "react";
import "../assets/css/VideoView.css";

const VideoView = () => {
  const videoRealtime = useRef();
  const videoRecord = useRef();
  const btnDownload = useRef();
  const mediaRecorder = useRef(null);
  
  const [recording, setRecording] = useState(false);
  
  var arrVideoData = [];
  
  // 녹화 시작
  const startRecord = (e) => {
    setRecording(true);
    // 카메라 입력영상 스트림 생성
    const constraints = { audio: true, video: true };
    navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
      // 실시간 영상 재생 처리: 첫번째 video태그에서 재생
      videoRealtime.current.srcObject = mediaStream;
      // videoRealtime.current.src = mediaStream;
      videoRealtime.current.onloadedmetadata = () => {
        videoRealtime.current.play();
      };

      // mediaRecorder객체(녹화기) 생성
      mediaRecorder.current = new MediaRecorder(mediaStream);

      // 녹화 데이터 입력 이벤트 처리
      mediaRecorder.current.ondataavailable = (event) => {
        // 녹화 데이터(Blob)가 들어올 때마다 배열에 담아두기
        arrVideoData.push(event.data);
      };

      // 녹화 종료 이벤트 처리
      mediaRecorder.current.onstop = () => {
        // 배열에 담아둔 녹화 데이터들을 통합한 Blob객체 생성
        const videoBlob = new Blob(arrVideoData);

        // BlobURL(ObjectURL) 생성
        const blobURL = window.URL.createObjectURL(videoBlob);

        // 녹화된 영상 재생: 두번째 video태그에서 재생
        videoRecord.current.src = blobURL;
        videoRecord.current.play();

        // 기존 녹화 데이터 제거
        arrVideoData.splice(0);
      };

      // 녹화 시작
      mediaRecorder.current.start();
    });
  };

  // 녹화 종료
  const stopRecord = (e) => {
    setRecording(false);
    mediaRecorder.current.stop();
  };

  // 다운로드
  const downloadRecord = (e) => {
    btnDownload.current.href = videoRecord.current.src;
    btnDownload.current.download = "record_video.mp3";
  }

  return (
    <div className="video-container">
      <h2>Video Recorder</h2>
      {recording && <video ref={videoRealtime} />}
      {!recording && <video ref={videoRecord} autoplay="autoplay" loop="loop" muted="muted" playsinline=""/> }
      <br />
      <br />
      <button onClick={recording ? stopRecord: startRecord}>{recording ? "정지" : "시작"}</button>
      {!recording && <a ref={btnDownload} onClick={downloadRecord}><button>다운로드</button></a>}
    </div>
  );
};

export default VideoView;
