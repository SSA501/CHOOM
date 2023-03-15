import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import DancePage from "./pages/DancePage/DancePage";

function App() {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="/dance" element={<DancePage />} />
    </Routes>
  );
}

export default App;
