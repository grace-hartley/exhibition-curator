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
    type: artwork.classification || "Type Unknown",
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
    type: artwork.artwork_type_title || "Type Unknown",
    imageUrl: artworkImage,
    imageUrlSmall: artworkImage, // no small image provided so just used standard image
    isHighlight: artwork.is_boosted,
    source: "The Art Institute of Chicago",
    description: artwork.description || "Description not available.",
    infoURL: detailsPage || "Link not available.",
  };
};

export const fetchAndNormalizeArt = async (page = 1, pageSize = 20) => {
  try {
    const chicArtworkList = await getChicArtworkList(page, pageSize);
    const normalizedChicagoArtworks = chicArtworkList
      .map(normalizeChicagoArtworks)
      .filter((artwork) => artwork !== null);

    const metObjectIDs = await getMetObjectIDs();
    const metArtworks = await Promise.all(
      metObjectIDs
        .slice((page - 1) * pageSize, page * pageSize)
        .map((id) => getMetObjectDetails(id))
    );
    const normalizedMetArtworks = metArtworks
      .map(normalizeMetArtwork)
      .filter((artwork) => artwork !== null);

    const combinedArtworks = [
      ...normalizedChicagoArtworks,
      ...normalizedMetArtworks,
    ];

    return combinedArtworks;
  } catch (error) {
    console.error("Error fetching and normalizing artwork:", error);
    return [];
  }
};
