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

  if (loading && page === 1) {
    return <p>Loading artworks...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h2>Metropolitan Art Museum Gallery</h2>
      <ul>
        {artworks.map((artwork) => (
          <li key={artwork.id}>
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              style={{ width: "20rem", height: "auto" }}
            />
            <p>
              {artwork.title}, {artwork.year}
            </p>
          </li>
        ))}
      </ul>
      {/* Load More Button */}
      {hasMore && !loading && (
        <button onClick={loadMoreArtworks}>Load More Artworks</button>
      )}
      {/* Show "loading" only when fetching more items */}
      {loading && page > 1 && <p>Loading more artworks...</p>}
    </>
  );
};

export default Gallery;
