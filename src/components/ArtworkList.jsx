import { Link } from "react-router-dom";
import { useContext } from "react";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import CuratedContext from "../context/CuratedContext";
import {
  addToCuratedList,
  isInCuratedList,
  removeFromCuratedList,
} from "../utils/curator-functions";

const ArtworkList = ({ artworks }) => {
  const { curatedList, setCuratedList } = useContext(CuratedContext);

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 list-none">
      {artworks.map((artwork) => (
        <li
          key={artwork.id}
          className="bg-white p-4 rounded shadow hover:shadow-lg transition"
        >
          <Link to={`/artwork/${artwork.id}`} key={artwork.id}>
            <img
              src={artwork.imageUrlSmall}
              alt={artwork.title}
              className="w-full h-auto mb-4 rounded"
            />
          </Link>
          <div className="text-center">
            <p className="text-lg font-semibold">{artwork.title}</p>
            <p className="text-sm text-gray-500">{artwork.year}</p>

            {isInCuratedList(artwork, curatedList) ? (
              <button
                onClick={() =>
                  removeFromCuratedList(artwork, curatedList, setCuratedList)
                }
              >
                <FiMinusCircle size={20} />
              </button>
            ) : (
              <button
                onClick={() =>
                  addToCuratedList(artwork, curatedList, setCuratedList)
                }
              >
                <FiPlusCircle size={20} />
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ArtworkList;
