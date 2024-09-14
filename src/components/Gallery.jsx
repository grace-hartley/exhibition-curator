import { useState, useEffect } from "react";
import { fetchAndNormalizeArt } from "../data/fetchAndNormalize";
import FilterSidebar from "./FilterSidebar";

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ source: "" });

  const pageSize = 20;

  useEffect(() => {
    const loadArtworks = async () => {
      setLoading(true);
      try {
        const newArtworks = await fetchAndNormalizeArt(page, pageSize);
        setArtworks((prevArtworks) => [...prevArtworks, ...newArtworks]);
      } catch (err) {
        setError("Failed to load artworks");
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, [page]);

  useEffect(() => {
    const applyFilters = () => {
      const { source } = filters;

      const filtered = artworks.filter((artwork) => {
        const matchesSource = source ? artwork.source === source : true;
        return matchesSource;
      });

      setFilteredArtworks(filtered);
    };

    applyFilters();
  }, [filters, artworks]);

  const loadMoreArtworks = () => {
    if (hasMore && !loading) {
      setPage((previousPage) => previousPage + 1);
    }
  };

  return (
    <div className="flex">
      <div className="flex">
        <FilterSidebar filters={filters} setFilters={setFilters} />
      </div>

      <div className="container w-full mx-auto p-4">
        <h2 className="text-4xl font-bold text-center mb-8">Gallery</h2>

        {loading && page === 1 ? (
          <p>Loading artworks...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 list-none">
              {filteredArtworks.map((artwork) => (
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
                    <p className="text-sm text-gray-500">{artwork.year}</p>
                  </div>
                </li>
              ))}
            </ul>

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
