import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMetObjectDetails } from "../api/metApi";
import { getChiArtworkDetails } from "../api/chicagoApi";
import {
  normalizeChicagoArtworks,
  normalizeMetArtwork,
} from "../data/fetchAndNormalize";

import { useContext } from "react";
import CuratedContext from "../context/CuratedContext";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import {
  addToCuratedList,
  isInCuratedList,
  removeFromCuratedList,
} from "../utils/curator-functions";

const ArtworkCard = () => {
  const [artworkCard, setArtworkCard] = useState([]);
  const { artwork_id } = useParams();
  const [loading, setLoading] = useState(true);
  const { curatedList, setCuratedList } = useContext(CuratedContext);

  useEffect(() => {
    if (artwork_id) {
      if (artwork_id.substr(0, 3) === "met") {
        getMetObjectDetails(artwork_id.substr(4)).then((artwork) => {
          setArtworkCard(normalizeMetArtwork(artwork));
          setLoading(false);
        });
      }
      if (artwork_id.substr(0, 3) === "chi") {
        getChiArtworkDetails(artwork_id.substr(4)).then((artwork) => {
          setArtworkCard(normalizeChicagoArtworks(artwork));
          setLoading(false);
        });
      }
    }
  }, [artwork_id]);

  if (loading) {
    return <p className="px-12 py-6 flex justify-center">Loading...</p>;
  }

  return (
    <div className="pb-12 bg-gray-50">
      <div className="px-12 py-6 flex justify-center items-center bg-gray-100">
        <div className="relative">
          <img
            src={artworkCard.imageUrl}
            alt={artworkCard.title}
            className="w-full h-auto max-w-3xl rounded shadow-lg"
          />
          <div className="absolute bottom-4 right-4">
            {isInCuratedList(artworkCard, curatedList) ? (
              <button
                onClick={() =>
                  removeFromCuratedList(
                    artworkCard,
                    curatedList,
                    setCuratedList
                  )
                }
                className="p-2 text-gray-800 hover:text-gray-600 transition bg-white rounded-full shadow-md"
              >
                <FiMinusCircle size={30} />
              </button>
            ) : (
              <button
                onClick={() =>
                  addToCuratedList(artworkCard, curatedList, setCuratedList)
                }
                className="p-2 text-gray-800 hover:text-gray-600 transition bg-white rounded-full shadow-md"
              >
                <FiPlusCircle size={30} />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto text-left p-6">
        <p className="text-3xl font-bold mb-2">{artworkCard.title}</p>
        <p className="text-lg text-gray-600 mb-1">{artworkCard.artist}</p>
        <p className="text-lg text-gray-600 mb-1">{artworkCard.year}</p>

        <div className="border-t border-gray-300 mt-4">
          <div className="grid grid-cols-2 gap-2 py-2">
            <div className="py-2 font-semibold">Type</div>
            <div className="py-2 text-gray-600">{artworkCard.type}</div>
            <hr className="border-gray-300 my-1 col-span-2" />

            <div className="py-2 font-semibold">Medium</div>
            <div className="py-2 text-gray-600">{artworkCard.medium}</div>
            <hr className="border-gray-300 my-1 col-span-2" />

            <div className="py-2 font-semibold">On Display</div>
            <div className="py-2 text-gray-600">{artworkCard.source}</div>
            <hr className="border-gray-300 my-1 col-span-2" />

            <div className="py-2 font-semibold">Further Info</div>
            <div className="py-2 text-gray-600 break-words max-w-full">
              <a
                href={artworkCard.infoURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {artworkCard.title}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
