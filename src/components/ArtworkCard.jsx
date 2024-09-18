import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMetObjectDetails } from "../api/metApi";
import { getChiArtworkDetails } from "../api/chicagoApi";
import {
  normalizeChicagoArtworks,
  normalizeMetArtwork,
} from "../data/fetchAndNormalize";

const ArtworkCard = () => {
  const [artworkCard, setArtworkCard] = useState([]);
  const { artwork_id } = useParams();
  const [loading, setLoading] = useState(true);

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
    return <p>Loading...</p>;
  }

  return (
    <div className="pb-12">
      <div className="px-12 py-6 flex justify-center items-center bg-zinc-100">
        <img
          src={artworkCard.imageUrlSmall}
          alt={artworkCard.title}
          className="w-fit rounded"
        />
      </div>
      <div className="text-center divide-y-2 divide-slate-400/25">
        <p className="text-2xl font-semibold p-2">{artworkCard.title}</p>
        <p className="text-lg text-gray-500">{artworkCard.artist}</p>
        <p className="text-lg text-gray-500">{artworkCard.year}</p>
        <p className="text-md text-gray-500">{artworkCard.type}</p>
        <p className="text-md text-gray-500">{artworkCard.medium}</p>
        <p className="text-md text-gray-500">
          For more info: {artworkCard.infoURL}
        </p>
      </div>
    </div>
  );
};

export default ArtworkCard;
