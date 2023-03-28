import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginKakao } from "../../apis/api";
import Spinner from "../../components/Spinner/Spinner";
import { useAppDispatch } from "../../constants/types";
import { updateAccessToken, updateLoginStatus } from "../../store/mainReducer";

function KakaoRedirectPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  let kakaoCode = searchParams?.get("code");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(kakaoCode);
    if (kakaoCode) {
      loginKakao(kakaoCode)
        .then((res) => {
          console.log(res);
          // dispatch(updateLoginStatus);
          // dispatch(updateAccessToken(accessToken));
          // navigate(-2);
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch, kakaoCode, navigate]);

  return (
    <div style={{ textAlign: "center" }}>
      <Spinner />
      <p>카카오 로그인 중입니다...</p>
    </div>
  );
}

export default KakaoRedirectPage;