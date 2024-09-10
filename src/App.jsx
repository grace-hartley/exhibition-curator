import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./input.css";

import Header from "./components/Header";
import Home from "./components/Home";
import UserArt from "./components/CuratedArt";
import Gallery from "./components/Gallery";

function App() {
  const [curatedArt, setCuratedArt] = useState([]);
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserArt />} />
        <Route path="/artwork" element={<Gallery />} />
        {/* <Route path="/artwork/" /> */}
      </Routes>
    </>
  );
}

export default App;
