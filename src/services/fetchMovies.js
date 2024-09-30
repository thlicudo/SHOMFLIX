import axios from "axios";
import API_KEY from "./API";
import { fetchImages } from "./fetchImages";
import { fetchMovieDetail } from "./fetchDetails";

const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${API_KEY}`;
const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?language=en-US&region=US&api_key=${API_KEY}`;
const TOP_RATED_URL = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&region=US&api_key=${API_KEY}`;
const UPCOMING_URL = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&region=US&api_key=${API_KEY}`;
const NOW_PLAYING_URL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&region=US&api_key=${API_KEY}`;
const DISCOVER_URL = (page) =>
  `https://api.themoviedb.org/3/discover/movie?page=${page}&include_adult=false&language=en-US&sort_by=popularity.desc&api_key=${API_KEY}`;

// API SLIDER MOVIES
export const fetchMovies = async () => {
  try {
    const res = await Promise.all([
      axios.get(POPULAR_URL),
      axios.get(TOP_RATED_URL),
      axios.get(UPCOMING_URL),
      axios.get(NOW_PLAYING_URL),
    ]);

    let [popMovies, topMovies, upcomingMovies, nowMovies] = res.map(
      (r) => r.data.results,
    );

    const movies = {
      popular: popMovies,
      topRated: topMovies,
      upcoming: upcomingMovies,
      nowPlaying: nowMovies,
    };

    return movies;
  } catch (err) {
    console.error(err);
  }
};

// API TRENDING MOVIES
export const fetchTrendingMovies = async () => {
  try {
    const res = await axios.get(TRENDING_URL);
    let movies = res.data.results;

    // Get Images
    movies = await Promise.all(
      movies.map(async (movie) => {
        const details = await fetchMovieDetail(movie.id);
        const images = await fetchImages(
          movie.id,
          movie.original_language,
          null,
        );
        return { ...movie, ...details, images };
      }),
    );

    // Get Trailer and delete unnecessary Arrays
    movies.map((movie) => {
      movie.videos = movie.details.videos;
      delete movie.details;
      delete movie.videos.videos;
    });

    return movies;
  } catch (err) {
    console.error(err);
  }
};

// API MOVIES IN MOVIE PAGE
export const fetchDiscoverMovies = async (page) => {
  try {
    const res = await axios.get(DISCOVER_URL(page));
    const data = res.data;
    const results = data.results;

    return results;
  } catch (err) {
    console.error(err);
  }
};
