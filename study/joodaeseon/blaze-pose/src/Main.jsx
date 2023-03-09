import React, { useState } from "react";
import App from "./App";
import UploadImg from "./UploadImg";

export default function Main() {
  const [poses, setPoses] = useState([]);

  return (
    <div>
      <UploadImg setPoses={setPoses} />
      <App poses={poses} />
    </div>
  );
}
