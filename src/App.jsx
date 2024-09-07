import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.scss";

import Header from "./components/Header";
import Home from "./components/Home";
import UserArt from "./components/UsersArt";
import Gallery from "./components/Gallery";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserArt />} />
        <Route path="/artwork" element={<Gallery />} />
      </Routes>
    </>
  );
}

export default App;
