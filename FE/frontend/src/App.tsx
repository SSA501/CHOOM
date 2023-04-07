import React, { useState, useEffect, useCallback } from "react";
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
  updateOpenLoginModal,
  updateRouteHistory,
} from "./store/authReducer";
import LoginModal from "./components/Modal/LoginModal";
import MyDancePage from "./pages/MyDancePage/MyDancePage";
import UploadingPage from "./pages/UploadingPage/UploadingPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
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

  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const routeHistory = useAppSelector((state) => state.auth.routeHistory);
  const openLoginModal = useAppSelector((state) => state.auth.openLoginModal);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

  const location = useLocation();
  const showLoginModal = useCallback(() => {
    dispatch(updateOpenLoginModal(true));
    document.body.style.overflow = "hidden";
  }, [dispatch]);
  const closeLoginModal = useCallback(() => {
    dispatch(updateOpenLoginModal(false));
    document.body.style.overflow = "auto";
  }, [dispatch]);

  useEffect(() => {
    setIsOpenLoginModal(openLoginModal);
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
      dispatch(updateOpenLoginModal(false));
    }

    if (isLogin) {
      closeLoginModal();
      // 로그인 하고 돌아와서 routeHistory가 남아있는 상태라면
      if (routeHistory !== "") {
        navigate(routeHistory); // 리다이렉트 이전 페이지로 이동
        dispatch(updateRouteHistory("")); // 저장해둔 리다이렉트 이전 페이지 초기화
      }
    }

    if (!isOpenLoginModal) document.body.style.overflow = "auto";
  }, [
    dispatch,
    isLogin,
    location,
    navigate,
    routeHistory,
    closeLoginModal,
    openLoginModal,
    showLoginModal,
    isOpenLoginModal,
  ]);

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
          <Route path="/mydance/:myDanceId" element={<MyDancePage />} />
          <Route path="/upload/*" element={<UploadingPage />} />
          <Route
            path="/login/oauth2/google/*"
            element={<LoginRedirectPage isGoogle />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      {isOpenLoginModal && (
        <LoginModal setLoginModalOpen={setIsOpenLoginModal} />
      )}
    </>
  );
}

export default App;
