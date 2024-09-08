import { getMetObjectIDs, getMetObjectDetails } from "../api/metApi";
// import chicago art api methods here

getMetObjectIDs;

const normalizeMetArtwork = (artwork) => {
  if (!artwork.primaryImage) return null;

  return {
    id: `met-${artwork.objectID}`,
    title: artwork.title || "Untitled",
    artist: artwork.artistDisplayName || "Unknown Artist",
    year: artwork.objectDate || "Unknown Date",
    medium: artwork.medium || "Unknown Medium",
    imageUrl: artwork.primaryImage,
    isHighlight: artwork.isHighlight,
    source: "Metropolitan Museum of Art",
    description: "",
  };
};

//Normalize Chicago art here

export const fetchAndNormalizeArt = async (page = 1, pageSize = 20) => {
  try {
    const normalizedMetArtworks = [];
    const normalizedChicagoArtworks = [];
    const allNormalizedArtworks = [];

    const metObjectIDs = await getMetObjectIDs(); // Fetch Met Museum object IDs
    let startIndex = (page - 1) * pageSize;
    let endIndex = startIndex + pageSize;

    // Ensure objectIDs are valid and not empty
    if (!metObjectIDs || metObjectIDs.length === 0) {
      console.error("No object IDs returned");
      return [];
    }

    // Keep fetching until we get enough valid artworks with images
    let currentIndex = startIndex;
    while (
      normalizedMetArtworks.length < pageSize &&
      currentIndex < metObjectIDs.length
    ) {
      // Fetch details for the next batch of Met Museum objects
      const metArtworks = await Promise.all(
        metObjectIDs
          .slice(currentIndex, currentIndex + pageSize)
          .map((id) => getMetObjectDetails(id))
      );

      // Normalize and filter Met Museum artworks (only those with images)
      const newArtworks = metArtworks
        .map(normalizeMetArtwork)
        .filter((artwork) => artwork !== null);

      normalizedMetArtworks.push(...newArtworks);

      // Adjust start and end index to fetch the next batch
      currentIndex += pageSize;
    }

    allNormalizedArtworks.push(...normalizedMetArtworks);

    return allNormalizedArtworks.slice(0, pageSize); // Return only the first pageSize artworks
  } catch (error) {
    console.error("Error fetching and normalizing artwork:", error);
    return [];
  }
};
