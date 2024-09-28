import { useState, useEffect } from "react";
import { fetchAndNormalizeArt } from "../data/fetchAndNormalize";
import ArtworkList from "./ArtworkList";

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArtworks = async () => {
      setLoading(true);
      try {
        const newArtworks = await fetchAndNormalizeArt(page);
        if (page === 1) {
          setArtworks(newArtworks);
        } else {
          setArtworks((prevArtworks) => [
            ...prevArtworks,
            ...newArtworks.filter(
              (newArtwork) =>
                !prevArtworks.some((art) => art.id === newArtwork.id)
            ),
            // included .filter .some above for two children with same key issue - think something funny going on with the API
          ]);
        }
      } catch (err) {
        setError("Failed to load artworks");
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, [page]);

  const loadMoreArtworks = () => {
    if (hasMore && !loading) {
      setPage((previousPage) => previousPage + 1);
    }
  };

  return (
    <div className="flex">
      <div className="container w-full mx-auto p-4">
        {loading && page === 1 ? (
          <p>Loading artworks...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <ArtworkList artworks={artworks} />

            {hasMore && !loading && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMoreArtworks}
                  className="px-6 py-2 bg-stone-500 text-white font-semibold rounded hover:bg-orange-600 transition"
                >
                  Load More Artworks
                </button>
              </div>
            )}

            {loading && page > 1 && (
              <p className="text-center mt-4">Loading more artworks...</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;
