import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MainPage from "./pages/MainPage/MainPage";
import DancePage from "./pages/DancePage/DancePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import DetailPage from "./pages/DetailPage/DetailPage";
import LoginRedirectPage from "./pages/LoginRedirectPage/LoginRedirectPage";
import { useAppDispatch, useAppSelector } from "./constants/types";
import { axiosFileInstance, axiosInstance } from "./apis/instance";
import {
  updateAccessToken,
  updateLoginStatus,
  updateRouteHistory,
} from "./store/mainReducer";
import LoginModal from "./components/Modal/LoginModal";

function App() {
  const accessToken = useAppSelector((state) => state.main.accessToken);
  // 헤더 디폴트 추가
  if (accessToken) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
    axiosFileInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  }

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
        try {
          // 갱신 요청
          const res = await axiosInstance.post<any>(`/user/login/token`);
          const newAccessToken = res.data.data.accessToken;
          dispatch(updateAccessToken(newAccessToken));
          // 실패했던 요청 새로운 accessToken으로 헤더 변경하고 재요청
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          // 갱신 실패시 임의 로그아웃 처리
          console.log("갱신실패", err);
          dispatch(updateLoginStatus(false));
          dispatch(updateAccessToken(""));
          navigate("/");
        }
      }
      return Promise.reject(error);
    }
  );

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const isLogin = useAppSelector((state) => state.main.isLogin);
  const routeHistory = useAppSelector((state) => state.main.routeHistory);
  const location = useLocation();
  const showLoginModal = () => {
    setLoginModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setLoginModalOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const currentPath = location.pathname;
    // 로그인 안된 상태로 url 접근하면
    if (currentPath !== "/" && !isLogin && routeHistory === "") {
      if (
        currentPath !== "/login/oauth2/kakao" &&
        currentPath !== "/login/oauth2/google" &&
        currentPath !== "/profile"
      ) {
        dispatch(updateRouteHistory(currentPath)); // 리다이렉트 이전 페이지 저장
      }
      navigate("/");
      showLoginModal();
    }

    // 로그인 하고 돌아와서 routeHistory가 남아있는 상태라면
    if (routeHistory !== "" && isLogin) {
      navigate(routeHistory); // 리다이렉트 이전 페이지로 이동
      dispatch(updateRouteHistory("")); // 저장해둔 리다이렉트 이전 페이지 초기화
    }
  }, [dispatch, isLogin, location, navigate, routeHistory]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/challenge" element={<SearchPage />} />
          <Route path="/detail/:danceId" element={<DetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dance/:danceId" element={<DancePage />} />
          <Route path="/login/oauth2/kakao/*" element={<LoginRedirectPage />} />
          <Route
            path="/login/oauth2/google/*"
            element={<LoginRedirectPage isGoogle />}
          />
        </Route>
      </Routes>
      {loginModalOpen && <LoginModal setLoginModalOpen={setLoginModalOpen} />}
    </>
  );
}

export default App;
