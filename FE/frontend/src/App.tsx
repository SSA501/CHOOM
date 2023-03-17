import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MainPage from "./pages/MainPage/MainPage";
import DancePage from "./pages/DancePage/DancePage";
import ChallengePage from "./pages/ChallengePage/ChallengePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MyVideo from "./components/MyVideo/MyVideo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/challenge" element={<ChallengePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dance" element={<DancePage />} />
        <Route path="/video" element={<MyVideo />} />
      </Route>
    </Routes>
  );
}

export default App;
