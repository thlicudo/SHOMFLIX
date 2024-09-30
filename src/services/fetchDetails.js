import axios from "axios";
import API_KEY from "./API";
import { fetchVideosMovie, fetchVideosSeries } from "./fetchVideos";

const MOVIE_DETAIL_URL = (movie_id) =>
  `https://api.themoviedb.org/3/movie/${movie_id}?append_to_response=credits,release_dates&api_key=${API_KEY}`;

const TV_SHOW_DETAIL_URL = (series_id) =>
  `https://api.themoviedb.org/3/tv/${series_id}?append_to_response=aggregate_credits,images,content_ratings&api_key=${API_KEY}`;

// API FETCH FOR MOVIE DETAIL
export const fetchMovieDetail = async (movie_id) => {
  try {
    const res = await axios.get(MOVIE_DETAIL_URL(movie_id));
    let details = res.data;

    // ADD VIDEOS
    details.videos = await fetchVideosMovie(
      movie_id,
      details.original_language,
      details.origin_country[0],
    );

    // GET CAST DETAILS
    const castData = res.data.credits.cast;

    const country = details.origin_country?.[0] || "US";

    let filteredResults = details.release_dates.results.length
      ? details.release_dates.results
          .find((data) => data.iso_3166_1 === country)
          ?.release_dates.filter((data) => [2, 3, 4].includes(data.type))
      : [];

    details.certification = filteredResults?.[0] || {
      certification: "No Rating",
    };

    if (!details.certification.certification) {
      details.certification.certification = "No Rating";
    }

    return { details, castData };
  } catch (err) {
    console.error(err);
  }
};

// API FETCH FOR SERIES DETAIL
export const fetchSeriesDetail = async (series_id) => {
  try {
    const res = await axios.get(TV_SHOW_DETAIL_URL(series_id));
    let details = res.data;

    // ADD VIDEOS
    details.videos = await fetchVideosSeries(
      series_id,
      details.original_language,
      details.origin_country[0],
    );

    // Get the cast details
    const castData = res.data.aggregate_credits.cast;

    let contentRating = details.content_ratings.results.filter(
      (data) => data.iso_3166_1 === details.origin_country[0],
    );

    if (contentRating.length === 0) {
      contentRating = details.content_ratings.results.filter(
        (data) => data.iso_3166_1 === "US",
      );
    }

    // Default Rating if none
    if (contentRating.length === 0 || contentRating === "") {
      contentRating = [{ rating: "No Rating" }];
    }

    // Default Overview if none
    if (details.overview === "") {
      details.overview = "No overview available for this series";
    }

    details.content_ratings = contentRating[0].rating;

    return { details, castData };
  } catch (err) {
    console.error(err);
  }
};
