import { useNavigate } from "react-router-dom";
import Video from "../Video/Video";
import { VideoListContainer, VideoItem } from "./style";
import { MdFavorite } from "react-icons/md";

type VideoListProps = {
  listOption: "History" | "Likes";
  videoList: any[];
  setVideoItemList: (videoList: any[]) => void;
};

function VideoList(props: VideoListProps) {
  const handleLike = (videoId: number, isLike: boolean) => {
    const newVideoList = props.videoList.map((video) =>
      video.id === videoId ? { ...video, isLike: !isLike } : video
    );
    // TODO: 즐겨찾기 영상 좋아요 해제|추가 기능 구현하기
    console.log(`${videoId}번 영상 좋아요 ${isLike ? "해제" : "추가"}`);
    props.setVideoItemList(newVideoList);
  };

  const navigate = useNavigate();
  const handleClickVideo = (videoId: number): void => {
    if (props.listOption === "History") navigate(`/dance/${videoId}`);
    else navigate(`/detail/${videoId}`);
  };

  var videoItemList;

  if (props.listOption === "History") {
    videoItemList = props.videoList.map((item: any) => (
      <VideoItem
        bgColor={
          item.score >= 80
            ? "green"
            : item.score >= 60
            ? "purple"
            : item.score >= 40
            ? "blue"
            : "skyblue"
        }
      >
        <Video
          id={item.id}
          title={item.title}
          videoPath={item.videoPath}
          thumbnailPath={item.thumbnailPath}
          handleClickVideo={() => handleClickVideo(item.id)}
        />
        <div>{item.score}</div>
      </VideoItem>
    ));
  } else {
    videoItemList = props.videoList.map((item: any) => {
      return (
        <VideoItem bgColor={"black"} isLike={item.isLike}>
          <Video
            id={item.id}
            title={item.title}
            videoPath={item.youtubeUrl}
            thumbnailPath={item.thumbnailPath}
            handleClickVideo={() => handleClickVideo(item.id)}
          />
          <MdFavorite onClick={() => handleLike(item.id, item.isLike)} />
        </VideoItem>
      );
    });
  }

  return <VideoListContainer>{videoItemList}</VideoListContainer>;
}

export default VideoList;
