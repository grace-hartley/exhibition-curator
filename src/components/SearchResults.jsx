import { useState, useEffect } from "react";
import { fetchAndNormalizeArt } from "../data/fetchAndNormalize";
import ArtworkList from "./ArtworkList";
import FilterBar from "./FilterBar";

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
        if (newArtworks.length < pageSize) {
          setHasMore(false);
        }

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
  }, [page, searchQuery, filters]);

  useEffect(() => {
    setPage(1);
    setArtworks([]);
    setHasMore(true);
  }, [searchQuery, setPage, filters]);

  const loadMoreArtworks = () => {
    if (hasMore && !loading) {
      setPage((previousPage) => previousPage + 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-bold text-center mb-8">
        Search Results for {searchQuery}
      </h2>

      <div className="mb-4">
        <FilterBar filters={filters} setFilters={setFilters} />
      </div>

      {loading && page === 1 ? (
        <p>Loading artworks...</p>
      ) : error ? (
        <p>{error}</p>
      ) : artworks.length === 0 ? (
        <p>No results available</p>
      ) : (
        <>
          <ArtworkList artworks={artworks} />

          {hasMore && !loading && (
            <div className="text-center mt-8">
              <button
                onClick={loadMoreArtworks}
                className="px-6 py-2 bg-zinc-500 text-white font-semibold rounded hover:bg-orange-600 transition"
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
  );
};

export default SearchResults;
