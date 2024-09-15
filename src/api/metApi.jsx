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

export const searchMetArtworks = (query, page = 1, pageSize = 20) => {
  const path =
    "https://collectionapi.metmuseum.org/public/collection/v1/search";

  const params = {
    q: query,
    page: page,
    limit: pageSize,
  };

  return axios
    .get(path, { params })
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
//https://collectionapi.metmuseum.org/public/collection/v1/search?dateBegin=1700&dateEnd=1800&q=African
//note query has to go at the end ?! could have something to do with it
