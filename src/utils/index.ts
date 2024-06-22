const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "152cd7ac66bc4131bfa1eec447a9d82d";

interface stringType {
  type: string;
  id: string;
}

export const getTrendingMedias = async (type: stringType) => {
  try {
    const res = await fetch(
      `${BASE_URL}/trending/${type}/day?api_key=${API_KEY}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    console.log(data, "trending");
    return data && data.results;
  } catch (e) {
    console.error(e);
  }
};
export const getTopratedMedias = async (type: stringType) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/top_rated?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    console.log(data, "toprated");
    return data && data.results;
  } catch (e) {
    console.log(e);
  }
};
export const getPopularMedias = async (type: stringType) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    console.log(data, "popular");
    return data && data.results;
  } catch (e) {
    console.log(e);
  }
};
export const getTVorMoviesByGenre = async (
  type: stringType,
  id: stringType
) => {
  try {
    const res = await fetch(
      `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&include_adult=true&sort_by=popularity.desc&with_genres=${id}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log(data, "popular");
    return data && data.results;
  } catch (error) {
    console.log("failed to fetch tmdb data:", error);
  }
};

export const getTVorMovieVideosByID = async (type, id) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getTVorMovieDetailsByID = async (type, id) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();

    console.log(data);

    return data;
  } catch (error) {
    console.log("failed to fetch tmdb data:", error);
  }
};
