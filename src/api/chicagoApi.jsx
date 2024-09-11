import axios from "axios";

export const getChicArtworkList = async (page = 1, pageSize = 20) => {
  let path = `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${pageSize}`;

  try {
    const response = await axios.get(path);

    // Return the data if it's successful and valid
    if (response.status === 200 && response.data && response.data.data) {
      return response.data.data;
    } else {
      // Return empty array if response is invalid
      return [];
    }
  } catch (error) {
    console.error("Error fetching Chicago artworks list:", error);
    return []; // Return an empty array to avoid breaking the app
  }
};
