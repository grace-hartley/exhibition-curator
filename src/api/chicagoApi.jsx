import axios from "axios";

export const getChicArtworkList = (page = 1, pageSize = 20) => {
  let path = `https://api.artic.edu/api/v1/artworks?fields=id,title,artist_title,date_display,medium_display,artwork_type_title,image_id,is_boosted,date_end,?page=${page}&limit=${pageSize}`;

  return axios
    .get(path)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error("Error fetching Chicago artworks list:", error);
      return [];
    });
};

export const getChiArtworkDetails = (artworkID) => {
  let path = `https://api.artic.edu/api/v1/artworks/${artworkID}`;

  return axios
    .get(path)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(
        `Error fetching details for Chicago Artwor ${objectID}:`,
        error
      );
      return [];
    });
};

export const searchChicagoArtworks = async (
  query = "",
  page = 1,
  pageSize = 20
) => {
  let path = `https://api.artic.edu/api/v1/artworks/search?q=${query}&page=${page}&limit=${pageSize}&fields=id,title,artist_title,date_display,medium_display,artwork_type_title,image_id,is_boosted,date_end,date_start`;

  return axios
    .get(path)
    .then((response) => {
      if (response.status === 200 && response.data && response.data.data) {
        return response.data.data;
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error("Error searching Chicago artworks:", error);
      return [];
    });
};

// example of working year range filter
// https://api.artic.edu/api/v1/artworks/search?q=flower&query[range][date_end][gte]=1700&query[range][date_end][lte]=1800
