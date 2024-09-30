import { useEffect, useState } from "react";
import { fetchMovieDetail, fetchSeriesDetail } from "../services/fetchDetails";

export const useGetMovieDetail = (movie_id) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState(null);
  const imagePath = `https://image.tmdb.org/t/p/original/`;

  // GET MOVIE DETAILS FROM API
  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        const { details, castData } = await fetchMovieDetail(movie_id);

        setCast(castData);
        setMovieDetails(details);
      } catch (err) {
        console.error(err);
      }
    };
    getMovieDetail();
  }, [movie_id]);

  return { movieDetails, cast, imagePath };
};

export const useGetSeriesDetail = (series_id) => {
  const [seriesDetail, setSeriesDetail] = useState(null);
  const [cast, setCast] = useState(null);
  const imagePath = `https://image.tmdb.org/t/p/original/`;

  // GET SERIES DETAILS FROM API
  useEffect(() => {
    const getSeriesDetail = async () => {
      try {
        const { details, castData } = await fetchSeriesDetail(series_id);

        setCast(castData);
        setSeriesDetail(details);
      } catch (err) {
        console.error(err);
      }
    };
    getSeriesDetail();
  }, [series_id]);

  return { seriesDetail, cast, imagePath };
};
