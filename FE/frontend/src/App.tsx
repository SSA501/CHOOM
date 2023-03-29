import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MainPage from "./pages/MainPage/MainPage";
import DancePage from "./pages/DancePage/DancePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import DetailPage from "./pages/DetailPage/DetailPage";
import KakaoRedirectPage from "./pages/KakaoRedirectPage/KakaoRedirectPage";
import { useAppDispatch, useAppSelector } from "./constants/types";
import { axiosInstance } from "./apis/instance";
import { logout, reissueToken } from "./apis/user";
import { updateAccessToken } from "./store/mainReducer";

function App() {
  const accessToken = useAppSelector((state) => state.main.accessToken);
  // 헤더 디폴트 추가
  if (accessToken) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  }

  const dispatch = useAppDispatch();
  // 토큰 갱신
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const {
        config,
        response: { status, data },
      } = error;
      const originalRequest = config;
      if (status === 401 && data.error === "TokenExpiredException") {
        console.log("갱신하러옴");
        console.log("옛날거", accessToken);
        reissueToken()
          .then((res) => {
            console.log("갱신 성공!!!");
            const newAccessToken = res.data.accessToken;
            dispatch(updateAccessToken(newAccessToken));
            // 실패했던 요청 새로운 accessToken으로 헤더 변경하고 재요청
            console.log("헤더 바꿈");
            console.log("새거", newAccessToken);
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            console.log(originalRequest);
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            // 갱신 실패시 로그아웃
            console.log("갱신실패", err);
            return logout();
          });
      }
      return Promise.reject(error);
    }
  );

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/challenge" element={<SearchPage />} />
        <Route path="/detail/:danceId" element={<DetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dance/:danceId" element={<DancePage />} />
        <Route path="/login/oauth2/kakao/*" element={<KakaoRedirectPage />} />
      </Route>
    </Routes>
  );
}

export default App;
