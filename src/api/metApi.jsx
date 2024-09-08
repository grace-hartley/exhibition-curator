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
