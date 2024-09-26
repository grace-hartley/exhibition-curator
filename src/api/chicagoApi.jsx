import axios from "axios";

export const getChicArtworkList = () => {
  let path = `https://api.artic.edu/api/v1/artworks?fields=id,title,artist_title,date_display,medium_display,artwork_type_title,image_id,is_boosted,date_end,`;

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
  searchTerm,
  yearRange = {},
  isHighlight = null,
  artworkType = null
) => {
  let path = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(
    searchTerm
  )}&fields=id,title,artist_title,date_display,medium_display,artwork_type_title,image_id,is_boosted,date_end,date_start`;

  let conditions = [];

  if (yearRange.start && yearRange.end) {
    conditions.push(
      `query[bool][must][][range][date_end][gte]=${yearRange.start}`
    );
    conditions.push(
      `query[bool][must][][range][date_end][lte]=${yearRange.end}`
    );
  }

  if (isHighlight !== null) {
    conditions.push(
      `query[bool][must][][term][is_boosted]=${isHighlight ? "true" : "false"}`
    );
  }

  if (artworkType) {
    conditions.push(
      `query[bool][must][][match][artwork_type_title]=${encodeURIComponent(
        artworkType
      )}`
    );
  }

  let query = conditions.length > 0 ? `&${conditions.join("&")}` : "";

  let finalUrl = path + query;

  return axios
    .get(finalUrl)
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

// example of working filters
// https://api.artic.edu/api/v1/artworks/search?q=flower&page=1&limit=20&fields=id,title,artist_title,date_display,medium_display,artwork_type_title,image_id,is_boosted,date_end,date_start&query[range][date_end][gte]=1700&query[range][date_end][lte]=1800

// https://api.artic.edu/api/v1/artworks/search?q=flower&query[term][is_boosted]=true

/* 
types:
Painting
Sculpture
Print
Photograph
Drawing and Watercolor
Textile
Architectural Drawing
Vessel
Book

*/
