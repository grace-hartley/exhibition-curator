// Make api calls to all required endpoints

import axios from "axios";

export const getMetObjects = () => {
  let path = "https://collectionapi.metmuseum.org/public/collection/v1/objects";

  return axios.get(path).then((response) => {
    return response.data.objectIDs;
  });
};
// Get working
// Update to include department ID parameter

// API call for individual object with object ID
