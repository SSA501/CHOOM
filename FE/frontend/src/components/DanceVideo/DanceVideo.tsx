import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { CgEditFlipH } from "react-icons/cg";
import { MdSlowMotionVideo, MdVolumeUp, MdPlayArrow } from "react-icons/md";
import CircleBtn from "../CircleBtn/CircleBtn";
import { MainContainer, BtnContainer } from "../Dance/style";
import { ChallengeVideo } from "./style";
import * as poseDetection from "@tensorflow-models/pose-detection";

interface Pose {
  keypoints: poseDetection.Keypoint[];
}

const DanceVideo = forwardRef(
  (
    props: {
      setPoseList: (poseList: Pose[]) => void;
      poseList: Pose[];
      detector: poseDetection.PoseDetector;
      myUrl?: string;
    },
    ref: React.ForwardedRef<any>
  ) => {
    let poseListTemp: Pose[] = [];

    const [videoUrl, setVideoUrl] = useState<string>("");
    const video = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
      playVideo,
      changeVideoTime,
    }));

    // 비디오 업로드
    const uploadVideo = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];

      if (file !== undefined) {
        setVideoUrl(URL.createObjectURL(file));
      }
    };

    // 분석시작
    const startEstimate = async () => {
      if (video.current) {
        video.current.currentTime = 0;
        video.current.play();

        await runFrame();
      }
    };

    // 분석
    const runFrame = async () => {
      if (video.current?.paused) {
        alert("완료");
        console.log(poseListTemp);
        props.setPoseList(poseListTemp);
        return;
      }

      await renderResult();
      requestAnimationFrame(runFrame);
    };

    // 결과저장
    const renderResult = async () => {
      const estimatePoseList = await props.detector.estimatePoses(
        video.current!
      );

      if (estimatePoseList.length > 0) {
        const newKpts: poseDetection.Keypoint[] = [];
        estimatePoseList[0].keypoints.map((kpt: poseDetection.Keypoint) => {
          newKpts.push({
            x: (kpt.x * 450) / video.current?.videoWidth!,
            y: (kpt.y * 800) / video.current?.videoHeight!,
            z: kpt.z,
            score: kpt.score,
          });
          return newKpts;
        });
        poseListTemp.push({ keypoints: newKpts });
      }
    };

    const playVideo = () => {
      video.current?.play();
    };

    const changeVideoTime = (time: number) => {
      if (video.current) video.current.currentTime = time;
    };

    return (
      <div>
        {!props.myUrl ? (
          <MainContainer>
            <ChallengeVideo
              src={videoUrl}
              width={450}
              height={800}
              ref={video}
            />

            <BtnContainer>
              <CircleBtn
                icon={MdSlowMotionVideo}
                label={"재생 속도"}
                disabled={props.poseList.length === 0 ? "disabled" : ""}
              />
              <CircleBtn
                icon={CgEditFlipH}
                label={"좌우 반전"}
                disabled={props.poseList.length === 0 ? "disabled" : ""}
              />
              <CircleBtn
                icon={MdVolumeUp}
                label={"음량"}
                disabled={props.poseList.length === 0 ? "disabled" : ""}
              />
              <CircleBtn
                icon={MdPlayArrow}
                label={"재생"}
                disabled={props.poseList.length === 0 ? "disabled" : ""}
              />
            </BtnContainer>
          </MainContainer>
        ) : (
          <MainContainer>
            <ChallengeVideo
              src={props.myUrl}
              width={450}
              height={800}
              ref={video}
              controls
            />
          </MainContainer>
        )}
        {!props.myUrl && (
          <div>
            <input
              type="file"
              id="videofile"
              name="video"
              accept="video/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                uploadVideo(e);
              }}
            />
            <button onClick={() => startEstimate()}>시작</button>
          </div>
        )}
      </div>
    );
  }
);

export default DanceVideo;
