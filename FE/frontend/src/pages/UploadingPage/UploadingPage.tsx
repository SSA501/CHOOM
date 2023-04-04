import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import Spinner from "../../components/Spinner/Spinner";
import { postingChallenge } from "../../apis/dance";
function UploadingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams?.get("code");
  const myDanceId = useSelector((state: RootState) => state.myDance.myDanceId);

  useEffect(() => {
    const htmlTitle = document.querySelector("title");
    htmlTitle!.innerHTML = "업로드 중 - CHOOM";

    postingChallenge(myDanceId!, code!)
      .then((res) => {
        window.open(res.youtubeUrl);
        navigate(`/mydance/${myDanceId}`);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <Spinner />
      <p>업로드 중입니다...</p>
    </div>
  );
}

export default UploadingPage;
