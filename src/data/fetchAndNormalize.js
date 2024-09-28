import {
  getChicArtworkList,
  searchChicagoArtworks,
  getChiArtworkDetails,
} from "../api/chicagoApi";
import {
  getMetObjectIDs,
  getMetObjectDetails,
  searchMetArtworks,
} from "../api/metApi";

export const normalizeMetArtwork = (artwork) => {
  if (!artwork.primaryImage) return null; // don't include artwork that doesn't have an image

  return {
    id: `met-${artwork.objectID}`,
    idOrigin: artwork.objectID,
    title: artwork.title || "Untitled",
    artist: artwork.artistDisplayName || "Unknown Artist",
    year: artwork.objectDate || "Unknown Date",
    yearEnd: artwork.objectEndDate,
    medium: artwork.medium || "Unknown Medium",
    type: artwork.classification || "Type Unknown",
    imageUrl: artwork.primaryImage,
    imageUrlSmall: artwork.primaryImageSmall,
    isHighlight: artwork.isHighlight,
    source: "Metropolitan Museum of Art",
    infoURL: artwork.objectURL || "Link not available.",
  };
};

export const normalizeChicagoArtworks = (artwork) => {
  if (artwork.image_id === null) return null;

  const artworkImage = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;

  const detailsPage = `https://www.artic.edu/artworks/${
    artwork.id
  }/${artwork.title.replace(/\s+/g, "-").toLowerCase()}`;

  return {
    id: `chi-${artwork.id}`,
    idOrigin: artwork.id,
    title: artwork.title || "Untitled",
    artist: artwork.artist_title || "Unknown Artist",
    year: artwork.date_display || "Unknown Date",
    yearEnd: artwork.date_end,
    medium: artwork.medium_display || "Unknown Medium",
    type: artwork.artwork_type_title || "Type Unknown",
    imageUrl: artworkImage,
    imageUrlSmall: artworkImage, // no small image provided so just used standard image again
    isHighlight: artwork.is_boosted,
    source: "The Art Institute of Chicago",
    infoURL: detailsPage || "Link not available.",
  };
};

export const fetchAndNormalizeArt = async (
  page = 1,
  pageSize = 20,
  searchQuery = "",
  filters = {}
) => {
  try {
    let chicArtworkList = [];
    let metObjectIDs = [];
    const { source, artworkType, yearBegin, yearEnd, isHighlight } = filters;

    if (searchQuery) {
      const chiSearchResults = await searchChicagoArtworks(
        searchQuery,
        { start: yearBegin, end: yearEnd },
        isHighlight,
        artworkType,
        page,
        pageSize
      );

      const chicArtworkDetail = chiSearchResults.map(async (artwork) => {
        const details = await getChiArtworkDetails(artwork.id);
        return details;
      });

      chicArtworkList = await Promise.all(chicArtworkDetail);

      metObjectIDs = await searchMetArtworks(
        searchQuery,
        { start: yearBegin, end: yearEnd },
        isHighlight,
        artworkType
      );
    } else {
      chicArtworkList = await getChicArtworkList(page, pageSize);
      metObjectIDs = await getMetObjectIDs();
    }

    const metArtworks = await Promise.all(
      metObjectIDs
        .slice((page - 1) * pageSize, page * pageSize)
        .map((id) => getMetObjectDetails(id))
    );

    const normalizedChicagoArtworks = chicArtworkList
      .map(normalizeChicagoArtworks)
      .filter((artwork) => artwork !== null);

    const normalizedMetArtworks = metArtworks
      .map(normalizeMetArtwork)
      .filter((artwork) => artwork !== null);

    const combinedArtworks = [
      ...normalizedMetArtworks,
      ...normalizedChicagoArtworks,
    ];

    if (source) {
      return combinedArtworks.filter((artwork) => artwork.source === source);
    } else {
      return combinedArtworks;
    }
  } catch (error) {
    console.error("Error fetching and normalizing artwork:", error);
    return [];
  }
};
