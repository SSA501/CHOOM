import React, { useState, useRef } from 'react';

const VideoView = () => {
  const videoRealtime = React.useRef();
  const videoRecord = React.useRef();
  
  const [recording, setRecording] = React.useState(false);
  
  var mediaRecorder = null;
  var arrVideoData = [];

  
  // 녹화 시작
  const startRecord = (e) => {
    // 카메라 입력영상 스트림 생성
    const mediaStream = navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    
    // 실시간 영상 재생 처리: 첫번째 video태그에서 재생
    videoRealtime.current.srcObject = mediaStream;
    videoRealtime.current.onloadedmetadata = () => {
      videoRealtime.current.play();
    }

    // mediaRecorder객체(녹화기) 생성
    mediaRecorder = new MediaRecorder(mediaStream);

    // 녹화 데이터 입력 이벤트 처리
    mediaRecorder.ondataavailable = (event)=>{
        // 녹화 데이터(Blob)가 들어올 때마다 배열에 담아두기
        arrVideoData.push(event.data);
    }

    // 녹화 종료 이벤트 처리
    mediaRecorder.onstop = () => {
        // 배열에 담아둔 녹화 데이터들을 통합한 Blob객체 생성
        const videoBlob = new Blob(arrVideoData);

        // BlobURL(ObjectURL) 생성
        const blobURL = window.URL.createObjectURL(videoBlob);
        
        // 녹화된 영상 재생: 두번째 video태그에서 재생
        videoRecord.current.src = blobURL;
        videoRecord.current.play();
        
        // 기존 녹화 데이터 제거
        arrVideoData.splice(0);
        
    }
  
    // 녹화 시작
    setRecording(true);
    mediaRecorder.start();
  }
  
  // 녹화 종료
  const stopRecord = (e) => {
    setRecording(false);
    mediaRecorder.stop();
  }
  
  return (
    <div className="video-container">
      <p>[비디오]</p>    
      <video ref={videoRealtime} controls>실시간 영상 재생용</video>
      <video ref={videoRecord} controls>녹화된 영상 재생용</video>
      <br/><br/>
      <button onClick={startRecord}>시작</button>
      <button onClick={stopRecord}>정지</button>
    </div>
  );
}



export default VideoView;
