import axios from "axios";
import API_KEY from "./API";
import { fetchSeriesDetail } from "./fetchDetails";
import { fetchImagesSeries } from "./fetchImages";

const AIRING_URL = `https://api.themoviedb.org/3/tv/airing_today?language=en-US&api_key=${API_KEY}`;
const ON_THE_AIR_URL = `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&api_key=${API_KEY}`;
const POPULAR_URL = `https://api.themoviedb.org/3/tv/popular?language=en-US&api_key=${API_KEY}`;
const TOP_RATED_URL = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key=${API_KEY}`;
const DISCOVER_URL = (page) =>
  `https://api.themoviedb.org/3/tv/top_rated?page=${page}&language=en-US&api_key=${API_KEY}`;

export const fetchSeries = async () => {
  try {
    const res = await Promise.all([
      axios.get(AIRING_URL),
      axios.get(ON_THE_AIR_URL),
      axios.get(POPULAR_URL),
      axios.get(TOP_RATED_URL),
    ]);

    const [airing, onTheAir, popular, topRated] = res.map(
      (r) => r.data.results,
    );

    const series = {
      airingSeries: airing,
      onTheAirSeries: onTheAir,
      popularSeries: popular,
      topRatedSeries: topRated,
    };

    return series;
  } catch (err) {
    console.error(err);
  }
};

export const fetchTopRatedSeries = async () => {
  try {
    const res = await axios.get(TOP_RATED_URL);
    let series = res.data.results;

    series = await Promise.all(
      series.map(async (series) => {
        const details = await fetchSeriesDetail(series.id);
        const images = await fetchImagesSeries(
          series.id,
          series.original_language,
          null,
        );
        return { ...series, ...details, images };
      }),
    );

    // Get Trailer and delete unnecessary Arrays
    series.map((series) => {
      series.videos = series.details.videos;
      delete series.details;
      delete series.videos.videos;
    });

    return series;
  } catch (err) {
    console.error(err);
  }
};

export const fetchDiscoverSeries = async (page) => {
  try {
    const res = await axios.get(DISCOVER_URL(page));
    const data = res.data;
    const results = data.results;

    return results;
  } catch (err) {
    console.error(err);
  }
};
