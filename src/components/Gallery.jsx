import { useState, useEffect } from "react";
import { fetchAndNormalizeArt } from "../data/fetchAndNormalize";

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true); // To track if more data is available
  const [error, setError] = useState(null);

  const pageSize = 20; // Number of artworks to fetch per page

  useEffect(() => {
    const loadArtworks = async () => {
      setLoading(true);
      try {
        const newArtworks = await fetchAndNormalizeArt(page, pageSize);

        if (newArtworks.length < pageSize) {
          setHasMore(false);
        }
        setArtworks((previousArtworks) => [
          ...previousArtworks,
          ...newArtworks,
        ]);
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
    <div className="container w-full mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-8">
        Metropolitan Art Museum Gallery
      </h2>

      {loading && page === 1 ? (
        <p>Loading artworks...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 list-none">
            {artworks.map((artwork) => (
              <li
                key={artwork.id}
                className="bg-white p-4 rounded shadow hover:shadow-lg transition"
              >
                <img
                  src={artwork.imageUrlSmall}
                  alt={artwork.title}
                  className="w-full h-auto mb-4 rounded"
                />
                <div className="text-center">
                  <p className="text-lg font-semibold">{artwork.title}</p>
                  <p className="text-sm text-gray-500">
                    {artwork.year}, {artwork.id}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Load More Button */}
          {hasMore && !loading && (
            <div className="text-center mt-8">
              <button
                onClick={loadMoreArtworks}
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
              >
                Load More Artworks
              </button>
            </div>
          )}

          {/* Show "loading" only when fetching more items */}
          {loading && page > 1 && (
            <p className="text-center mt-4">Loading more artworks...</p>
          )}
        </>
      )}
    </div>
  );
};

export default Gallery;
