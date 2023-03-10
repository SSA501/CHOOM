import React, { useState } from "react";
import MyVideo from "./components/MyVideo";
import MyImage from "./components/MyImage";

function App() {
  const [poses, setPoses] = useState([]);
  return (
    <div className="App">
      <MyVideo poses={poses}></MyVideo>
      <MyImage setPoses={setPoses}></MyImage>
    </div>
  );
}

export default App;
