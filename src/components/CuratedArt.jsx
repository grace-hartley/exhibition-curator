import { useContext } from "react";
import CuratedContext from "../context/CuratedContext";
import ArtworkList from "./ArtworkList";
import Gallery from "./Gallery";

const CuratedCollection = () => {
  const { curatedList, setCuratedList } = useContext(CuratedContext);
  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-8 p-5">
        Welcome to Your Collection
      </h1>
      {curatedList.length === 0 ? (
        <div className="text-center">
          <p>
            Ugh oh! It looks like you haven't added any masterpieces to your
            collection yet.
          </p>
          <p>
            Start browzing the artworks below, or use the search bar to start
            adding to your collection!
          </p>
          <Gallery />
        </div>
      ) : (
        <>
          <ArtworkList artworks={curatedList} />
        </>
      )}
    </>
  );
};

export default CuratedCollection;
