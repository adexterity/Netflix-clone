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
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log(data, "trending");
    return data && data.results;
  } catch (error) {
    console.log("failed to fetch tmdb data:", error);
    if (error.message === "Request timed out") {
      console.error("network timedout: ", error);
    }
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
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log(data, "toprated");
    return data && data.results;
  } catch (error) {
    console.log("failed to fetch tmdb data:", error);
    if (error.message === "Request timed out") {
      console.error("network timedout: ", error);
    }
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

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log(data, "popular");
    return data && data.results;
  } catch (error) {
    console.log("failed to fetch tmdb data:", error);
    if (error.message === "Request timed out") {
      console.error("network timedout: ", error);
    }
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
    if (error.message === "Request timed out") {
      console.error("network timedout: ", error);
    }
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
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.log("failed to fetch tmdb data:", error);
    if (error.message === "Request timed out") {
      console.error("network timedout: ", error);
    }
  }
};

export const getTVorMovieSearchResult = async (type, query) => {
  try {
    const res = await fetch(
      `${BASE_URL}/search/${type}?api_key=${API_KEY}&include_adult=true&language=en-US&query=${query}`,
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
    if (error.message === "Request timed out") {
      console.error("network timedout: ", error);
    }
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
    if (error.message === "Request timed out") {
      console.error("network timedout: ", error);
    }
  }
};

export const getSimilarTVorMovies = async (type, id) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();

    console.log(data);

    return data && data.results;
  } catch (error) {
    console.log("failed to fetch tmdb data:", error);
    if (error.message === "Request timed out") {
      console.error("network timedout: ", error);
    }
  }
};


// GET FAVORITES

export const getAllFavorites = async (uid, accountID) => {
  try {
    const res = await fetch(
      `/api/favorites/get-all-favorites?id=${uid}&accountID=${accountID}`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();

    console.log(data, "getAllFavorites: utils");

    return data && data.data;
  } catch (error) {
    if (error.message === "Request timed out") {
      console.error("network timedout: ", error);
    }else{
      console.log(error)
    }
  }
};
