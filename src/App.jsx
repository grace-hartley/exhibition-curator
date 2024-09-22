import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./input.css";

import Header from "./components/Header";
import Home from "./components/Home";
import CuratedCollection from "./components/CuratedArt";
import Gallery from "./components/Gallery";
import SearchResults from "./components/SearchResults";
import ArtworkCard from "./components/ArtworkCard";
import CuratedContext from "./context/CuratedContext";

function App() {
  const [curatedList, setCuratedList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  return (
    <>
      <CuratedContext.Provider value={{ curatedList, setCuratedList }}>
        <Header setSearchTerm={setSearchQuery} setPage={setPage} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<CuratedCollection />} />
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
      </CuratedContext.Provider>
    </>
  );
}

export default App;
