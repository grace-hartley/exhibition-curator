import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./input.css";

import Header from "./components/Header";
import Home from "./components/Home";
import UserArt from "./components/CuratedArt";
import Gallery from "./components/Gallery";
import SearchResults from "./components/SearchResults";

function App() {
  const [curatedArt, setCuratedArt] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Header setSearchTerm={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserArt />} />
        <Route path="/artwork" element={<Gallery />} />
        <Route
          path="/search"
          element={<SearchResults searchQuery={searchQuery} />}
        />
        {/* <Route path="/artwork/" /> */}
      </Routes>
    </>
  );
}

export default App;
