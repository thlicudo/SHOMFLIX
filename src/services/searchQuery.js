import axios from "axios";
import API_KEY from "./API";

const SEARCH_URL = (query, page) =>
  `https://api.themoviedb.org/3/search/multi?query=${query}&language=en-US&page=${page}&api_key=${API_KEY}`;

const searchQuery = async (query, page) => {
  try {
    const res = await axios.get(SEARCH_URL(query, page));
    let results = res.data.results;

    results = res.data.results.filter((data) => data.media_type !== "person");

    return results;
  } catch (err) {
    console.error(err);
    return { results: [], total_pages: 0 };
  }
};

export default searchQuery;
