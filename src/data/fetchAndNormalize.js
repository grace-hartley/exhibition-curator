import { getChicArtworkList } from "../api/chicagoApi";
import { getMetObjectIDs, getMetObjectDetails } from "../api/metApi";

const normalizeMetArtwork = (artwork) => {
  if (!artwork.primaryImage) return null; // don't include artwork that doesn't have an image

  return {
    id: `met-${artwork.objectID}`,
    title: artwork.title || "Untitled",
    artist: artwork.artistDisplayName || "Unknown Artist",
    year: artwork.objectDate || "Unknown Date",
    medium: artwork.medium || "Unknown Medium",
    imageUrl: artwork.primaryImage,
    imageUrlSmall: artwork.primaryImageSmall,
    isHighlight: artwork.isHighlight,
    source: "Metropolitan Museum of Art",
    description: "Description not available.",
    infoURL: artwork.objectURL || "Link not available.",
  };
};

const normalizeChicagoArtworks = (artwork) => {
  const artworkImage = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;

  const detailsPage = `https://www.artic.edu/artworks/${
    artwork.id
  }/${artwork.title.replace(/\s+/g, "-").toLowerCase()}`;

  return {
    id: `chi-${artwork.id}`,
    title: artwork.title || "Untitled",
    artist: artwork.artist_title || "Unknown Artist",
    year: artwork.date_display || "Unknown Date",
    medium: artwork.medium_display || "Unknown Medium",
    imageUrl: artworkImage,
    imageUrlSmall: artworkImage, // no small image provided so just used standard image
    isHighlight: artwork.is_boosted,
    source: "The Art Institute of Chicago",
    description: artwork.description || "Description not available.",
    // infoURL: detailsPage || "Link not available.",
    //example URL: https://www.artic.edu/artworks/129884/starry-night-and-the-astronauts
  };
};

export const fetchAndNormalizeArt = async (page = 1, pageSize = 20) => {
  try {
    const normalizedMetArtworks = [];
    const normalizedChicagoArtworks = [];

    const metObjectIDs = await getMetObjectIDs(); // Fetch Met Museum object IDs
    const chicArtworkList = await getChicArtworkList(page, pageSize); // Fetch Chicago artwork list
    console.log(chicArtworkList.length);
    let startIndex = (page - 1) * pageSize;
    let endIndex = startIndex + pageSize;

    // Check objectIDs are valid and not empty
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

    const newChicagoArtworks = chicArtworkList
      .map(normalizeChicagoArtworks)
      .filter((artwork) => artwork !== null);

    normalizedChicagoArtworks.push(...newChicagoArtworks);

    const allNormalizedArtworks = [
      ...normalizedChicagoArtworks,
      ...normalizedMetArtworks,
    ];

    return allNormalizedArtworks.slice(0, pageSize); // Return only the first pageSize artworks
  } catch (error) {
    console.error("Error fetching and normalizing artwork:", error);
    return [];
  }
};
