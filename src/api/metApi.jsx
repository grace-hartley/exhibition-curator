import axios from "axios";

// Met Museum API
export const getMetObjectIDs = () => {
  let path = "https://collectionapi.metmuseum.org/public/collection/v1/objects";

  return axios
    .get(path)
    .then((response) => {
      return response.data.objectIDs;
    })
    .catch((error) => {
      console.error("Error fetching Met object IDs:", error);
      return [];
    });
};

export const getMetObjectDetails = (objectID) => {
  let path = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;
  return axios
    .get(path)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(
        `Error fetching details for Met object ID ${objectID}:`,
        error
      );
      return [];
    });
};

export const searchMetArtworks = (
  searchTerm,
  yearRange = {},
  isHighlight = null,
  artworkType = null
) => {
  let path = `https://collectionapi.metmuseum.org/public/collection/v1/search?`;

  let conditions = [];

  if (yearRange.start && yearRange.end) {
    conditions.push(`dateBegin=${yearRange.start}&dateEnd=${yearRange.end}`);
  }

  if (isHighlight !== null) {
    conditions.push(`isHighlight=${isHighlight ? "true" : "false"}`);
  }

  if (artworkType) {
    if (artworkType === "Painting") {
      conditions.push(`medium=Paintings`);
    } else if (artworkType === "Sculpture") {
      conditions.push(`medium=Sculpture`);
    } else if (artworkType === "Drawing") {
      conditions.push(`medium=Drawings`);
    } else if (artworkType === "Print") {
      conditions.push(`medium=Prints`);
    }
  }

  let query =
    conditions.length > 0
      ? `${conditions.join("&")}&q=${encodeURIComponent(searchTerm)}`
      : `q=${encodeURIComponent(searchTerm)}`;

  let finalUrl = path + query;

  return axios
    .get(finalUrl)
    .then((response) => {
      if (response.status === 200 && response.data && response.data.objectIDs) {
        return response.data.objectIDs;
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error("Error searching Met artworks:", error);
      return [];
    });
};
