import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TagsExtracter from "./pages/TagsExtracter";
import ThumbnailExtractor from "./pages/ThumbnailExtractor";
import Thumbnailsize from "./pages/Thumbnailsize";
import DescriptionExtractor from "./pages/DescriptionExtractor";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<DescriptionExtractor />} path="/yt-description" />
          <Route element={<TagsExtracter />} path="/yt-tags" />
          <Route element={<ThumbnailExtractor />} path="/yt-thumbnail-get" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
