const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "152cd7ac66bc4131bfa1eec447a9d82d";

interface stringType {
  type: string;
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
    console.log(data, 'trending')
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
    console.log(data, 'toprated');
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
    console.log(data, 'popular')
    return data && data.results;
  } catch (e) {
    console.log(e);
  }
};
