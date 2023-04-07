import React, { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginGoogle, loginKakao } from "../../apis/user";
import Spinner from "../../components/Spinner/Spinner";
import { useAppDispatch } from "../../constants/types";
import {
  updateAccessToken,
  updateLoginStatus,
  updateOpenLoginModal,
} from "../../store/authReducer";

interface LoginRedirectPageProps {
  isGoogle?: boolean;
}

function LoginRedirectPage({ isGoogle }: LoginRedirectPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  let code = searchParams?.get("code");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const updateUserStatus = useCallback(
    (response: any) => {
      const accessToken = response.data.accessToken;
      dispatch(updateLoginStatus(true));
      dispatch(updateAccessToken(accessToken));
      // alert("로그인 완료");
    },
    [dispatch]
  );

  useEffect(() => {
    // 카카오 로그인
    if (code && !isGoogle) {
      loginKakao(code)
        .then((res) => {
          updateUserStatus(res);
          dispatch(updateOpenLoginModal(false));
        })
        .catch((err) => console.log(err));
    }
    // 구글 로그인
    if (code && isGoogle) {
      loginGoogle(code)
        .then((res) => {
          updateUserStatus(res);
          dispatch(updateOpenLoginModal(false));
        })
        .catch((err) => console.log(err));
    }
  }, [isGoogle, dispatch, code, updateUserStatus, navigate]);

  return (
    <div style={{ textAlign: "center" }}>
      <Spinner />
      <p>{isGoogle ? "구글" : "카카오"} 로그인 중입니다...</p>
    </div>
  );
}

export default LoginRedirectPage;
