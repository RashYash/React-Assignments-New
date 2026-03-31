import React from "react";
import ReactDOM from "react-dom/client";

import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./Home.jsx";

import Assignment_1 from "./assignments/Assignment_1.jsx";
import Assignment_2 from "./assignments/Assignment_2.jsx";
import Assignment_3 from "./assignments/Assignment_3.jsx";
import Assignment_4 from "./assignments/Assignment_4.jsx";
import Assignment_5 from "./assignments/Assignment_5.jsx";
import Assignment_6 from "./assignments/Assignment_6.jsx";
import Assignment_7 from "./assignments/Assignment_7.jsx";
import Assignment_8 from "./assignments/Assignment_8.jsx";
import Assignment_9 from "./assignments/Assignment_9.jsx";
import Assignment_10 from "./assignments/Assignment_10.jsx";
import Assignment_11 from "./assignments/Assignment_11.jsx";
import Assignment_12 from "./assignments/Assignment_12.jsx";
import Assignment_13 from "./assignments/Assignment_13.jsx";
import Assignment_14 from "./assignments/Assignment_14.jsx";
import Assignment_15 from "./assignments/Assignment_15.jsx";
import Assignment_16 from "./assignments/Assignment_16.jsx";
import Assignment_17 from "./assignments/Assignment_17.jsx";
import Assignment_18 from "./assignments/Assignment_18.jsx";
import Assignment_19 from "./assignments/Assignment_19.jsx";
import Assignment_20 from "./assignments/Assignment_20.jsx";
import Assignment_21 from "./assignments/Assignment_21.jsx";
import Assignment_22 from "./assignments/Assignment_22.jsx";
import CursorSimple from "./assignments/CursorSimple.jsx";
import CursorTrail from "./assignments/CursorTrail.jsx";
import FlipMatchGame from "./assignments/FlipMatchGame.jsx";
import PixelateFilterApp from "./assignments/PixelateFilterApp.jsx";
import TextFileDownloader from "./assignments/TextFileDownloader.jsx";
import CustomContextMenu from "./assignments/CustomContextMenu.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/ASG-01" element={<Assignment_1 />} />
      <Route path="/ASG-02" element={<Assignment_2 />} />
      <Route path="/ASG-03" element={<Assignment_3 />} />
      <Route path="/ASG-04" element={<Assignment_4 />} />
      <Route path="/ASG-05" element={<Assignment_5 />} />
      <Route path="/ASG-06" element={<Assignment_6 />} />
      <Route path="/ASG-07" element={<Assignment_7 />} />
      <Route path="/ASG-08" element={<Assignment_8 />} />
      <Route path="/ASG-09" element={<Assignment_9 />} />
      <Route path="/ASG-10" element={<Assignment_10 />} />
      <Route path="/ASG-11" element={<Assignment_11 />} />
      <Route path="/ASG-12" element={<Assignment_12 />} />
      <Route path="/ASG-13" element={<Assignment_13 />} />
      <Route path="/ASG-14" element={<Assignment_14 />} />
      <Route path="/ASG-15" element={<Assignment_15 />} />
      <Route path="/ASG-16" element={<Assignment_16 />} />
      <Route path="/ASG-17" element={<Assignment_17 />} />
      <Route path="/ASG-18" element={<Assignment_18 />} />
      <Route path="/ASG-19" element={<Assignment_19 />} />
      <Route path="/ASG-20" element={<Assignment_20 />} />
      <Route path="/ASG-21" element={<Assignment_21 />} />
      <Route path="/ASG-22" element={<Assignment_22 />} />
      <Route path="/ASG-23" element={<CursorSimple />} />
      <Route path="/ASG-24" element={<CursorTrail />} />
      <Route path="/ASG-25" element={<FlipMatchGame />} />
      <Route path="/ASG-26" element={<PixelateFilterApp />} />
      <Route path="/ASG-27" element={<TextFileDownloader />} />
      <Route path="/ASG-28" element={<CustomContextMenu />} />
    </Routes>
  </HashRouter>,
);
