import { useState, useEffect } from "react";
import { fetchAndNormalizeArt } from "../data/fetchAndNormalize";
import ArtworkList from "./ArtworkList";
import FilterSidebar from "./FilterSidebar";

const SearchResults = ({ searchQuery, page, setPage }) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    source: "",
    artworkType: "",
    yearBegin: "",
    yearEnd: "",
    isHighlight: false,
  });

  const pageSize = 20;

  useEffect(() => {
    const loadArtworks = async () => {
      setLoading(true);
      try {
        const newArtworks = await fetchAndNormalizeArt(
          page,
          pageSize,
          searchQuery,
          filters
        );
        setArtworks(newArtworks);
      } catch (err) {
        setError("Failed to load artworks");
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, [page, searchQuery, filters]);

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
      <div className="container mx-auto p-4">
        <h2 className="text-4xl font-bold text-center mb-8">
          Search Results for {searchQuery}
        </h2>

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

export default SearchResults;
