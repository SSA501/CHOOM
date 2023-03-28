import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MainPage from "./pages/MainPage/MainPage";
import DancePage from "./pages/DancePage/DancePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import DetailPage from "./pages/DetailPage/DetailPage";
import KakaoRedirectPage from "./pages/KakaoRedirectPage/KakaoRedirectPage";
import { useAppSelector } from "./constants/types";
import { axiosInstance } from "./apis/instance";

function App() {
  const accessToken = useAppSelector((state) => state.main.accessToken);
  if (accessToken) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/challenge" element={<SearchPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dance/:danceId" element={<DancePage />} />
        <Route path="/login/oauth2/kakao/*" element={<KakaoRedirectPage />} />
      </Route>
    </Routes>
  );
}

export default App;
