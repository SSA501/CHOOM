import { useNavigate } from "react-router-dom";
import Video from "../Video/Video";
import { SERVER_URL } from "../../constants/url";
import { VideoListContainer, VideoItem } from "./style";
import { MdFavorite } from "react-icons/md";
import { addBookmark, removeBookmark } from "../../apis/challenge";

type VideoListProps = {
  listOption: "History" | "Likes";
  videoList: any[];
  setVideoItemList: (videoList: any[]) => void;
};

function VideoList(props: VideoListProps) {
  const handleLike = (danceId: number, isLike: boolean) => {
    if (isLike) {
      removeBookmark(danceId)
        .then(() => {
          const newVideoList = props.videoList.map((video) =>
            video.id === danceId ? { ...video, isLike: !isLike } : video
          );
          props.setVideoItemList(newVideoList);
        })
        .catch((err) => console.log(err));
    } else {
      addBookmark(danceId)
        .then(() => {
          const newVideoList = props.videoList.map((video) =>
            video.id === danceId ? { ...video, isLike: !isLike } : video
          );
          props.setVideoItemList(newVideoList);
        })
        .catch((err) => console.log(err));
    }
  };

  const navigate = useNavigate();
  const handleClickVideo = (danceId: number): void => {
    // TODO: 춤 춘 결과 상세페이지 연결
    if (props.listOption === "History") navigate(`/dance/${danceId}`);
    else navigate(`/detail/${danceId}`);
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
          width={"270px"}
          height={"480px"}
          key={item.id}
          id={item.id}
          title={item.title}
          videoPath={`${SERVER_URL}${item.videoPath}`}
          thumbnailPath={`${SERVER_URL}${item.thumbnailPath}`}
          handleClickVideo={() => handleClickVideo(item.danceId)}
        />
        <div>{item.score}</div>
      </VideoItem>
    ));
  } else {
    videoItemList = props.videoList.map((item: any) => {
      return (
        <VideoItem bgColor={"black"} isLike={item.isLike}>
          <Video
            width={"270px"}
            height={"480px"}
            key={item.id}
            id={item.id}
            title={item.title}
            url={item.url}
            videoPath={item.url}
            thumbnailPath={item.thumbnailPath}
            handleClickVideo={() => handleClickVideo(item.danceId)}
          />
          <MdFavorite onClick={() => handleLike(item.id, item.isLike)} />
        </VideoItem>
      );
    });
  }

  return <VideoListContainer>{videoItemList}</VideoListContainer>;
}

export default VideoList;
