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

  let query = `q=${encodeURIComponent(searchTerm)}`;

  if (yearRange.start && yearRange.end) {
    conditions.push(`dateBegin=${yearRange.start}&dateEnd=${yearRange.end}`);
  }

  if (isHighlight !== null) {
    conditions.push(`isHighlight=${isHighlight ? "true" : "false"}`);
  }

  if (artworkType) {
    if (artworkType === "Painting") {
      conditions.push(`medium=Paintings`);
    }
    if (artworkType === "Sculpture") {
      conditions.push(`medium=Sculpture`);
    }
    if (artworkType === "Drawing") {
      conditions.push(`medium=Drawings`);
    }
  }

  path += query;

  return axios
    .get(path)
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

// example of working year range filter
// https://collectionapi.metmuseum.org/public/collection/v1/search?&page=1&limit=20q=sunflowers

//https://collectionapi.metmuseum.org/public/collection/v1/search?dateBegin=1700&dateEnd=1800&q=African

// https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=African

// https://collectionapi.metmuseum.org/public/collection/v1/search?dateBegin=1700&dateEnd=1800&isHighlight=true&q=African

// https://collectionapi.metmuseum.org/public/collection/v1/search?medium=Drawings&q=African

// combining them works both ways around

/* 
types:
Woodwork
Basketry, Ceramics, Paintings


Ceramics
Furniture
Paintings
Sculpture
Textiles
Drawings


complicated...
*/
