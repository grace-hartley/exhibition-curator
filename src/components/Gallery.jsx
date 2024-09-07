import { useState, useEffect } from "react";
import { getMetObjects } from "../api";

const Gallery = () => {
  const [metArtworkIDs, setMetArtworkIDs] = useState([]);
  const [metArtworkList, setMetArtworkList] = useState([]);

  useEffect(() => {
    getMetObjects().then((metArtworkIDs) => {
      setMetArtworkIDs(metArtworkIDs);
    });
  });
  return (
    <>
      <p>Gallery Comming Soon</p>
      <ul>
        {metArtworkIDs.slice(0, 10).map(
          (
            id // Slice the first 10 items
          ) => (
            <li key={id}>{id}</li>
          )
        )}
      </ul>
    </>
  );
};

export default Gallery;
