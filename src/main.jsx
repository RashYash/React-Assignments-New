import React from "react";
import ReactDOM from "react-dom/client";

import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./Home.jsx";

import Assignment_1 from "./assignments/Assignment_1.jsx";
import Assignment_2 from "./assignments/Assignment_2.jsx";
import Assignment_3 from "./assignments/Assignment_3.jsx";
import Assignment_4 from "./assignments/Assignment_4.jsx";
import Assignment_5 from "./assignments/Assignment_5.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(

  <HashRouter>

    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/ASG-01" element={<Assignment_1 />} />
      <Route path="/ASG-02" element={<Assignment_2 />} />
      <Route path="/ASG-03" element={<Assignment_3 />} />
      <Route path="/ASG-04" element={<Assignment_4 />} />
      <Route path="/ASG-05" element={<Assignment_5 />} />
      

    </Routes>

  </HashRouter>

);
