import { useEffect, useState } from "react";
import {
  fetchMovies,
  fetchDiscoverMovies,
  fetchTrendingMovies,
} from "../services/fetchMovies";

// FETCH FOR SLIDER MOVIES
export const useFetchMovies = () => {
  const [movies, setMovies] = useState({
    popular: [],
    topRated: [],
    upcoming: [],
    nowPlaying: [],
  });

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (err) {
        console.error(err);
      }
    };
    getMovies();
  }, []);

  return movies;
};

// FETCH FOR SLIDESHOW MOVIES
export const useFetchTrendingMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (err) {
        console.error(err);
      }
    };
    getMovies();
  }, []);

  return movies;
};

// FETCH FOR MOVIES PAGE MOVIES
export const useFetchDiscoverMovies = (page) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const results = await fetchDiscoverMovies(page);

        const existingIds = new Set(movies.map((movie) => movie.id));

        const uniqueMovies = results.filter(
          (movie) => !existingIds.has(movie.id),
        );

        setMovies((prevMovies) =>
          page === 1 ? uniqueMovies : [...prevMovies, ...uniqueMovies],
        );
      } catch (err) {
        console.error(err);
      }
    };
    getMovies();
  }, [page]);

  return movies;
};
