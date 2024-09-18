import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./input.css";

import Header from "./components/Header";
import Home from "./components/Home";
import UserArt from "./components/CuratedArt";
import Gallery from "./components/Gallery";
import SearchResults from "./components/SearchResults";
import ArtworkCard from "./components/ArtworkCard";

function App() {
  const [curatedArt, setCuratedArt] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  return (
    <>
      <Header setSearchTerm={setSearchQuery} setPage={setPage} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserArt />} />
        <Route path="/artwork" element={<Gallery />} />
        <Route
          path="/search"
          element={
            <SearchResults
              searchQuery={searchQuery}
              page={page}
              setPage={setPage}
            />
          }
        />
        <Route path="/artwork/:artwork_id" element={<ArtworkCard />} />
      </Routes>
    </>
  );
}

export default App;
