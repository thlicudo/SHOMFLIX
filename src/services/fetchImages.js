import axios from "axios";
import API_KEY from "./API";

const MOVIE_IMAGES_URL = (movie_id, movie_lang) =>
  `https://api.themoviedb.org/3/movie/${movie_id}/images?include_image_language=${movie_lang}%2Cnull&api_key=${API_KEY}`;

const SERIES_IMAGES_URL = (series_id, series_lang) =>
  `https://api.themoviedb.org/3/tv/${series_id}/images?include_image_language=${series_lang}%2Cnull&api_key=${API_KEY}`;

// FETCH MOVIE IMAGES
export const fetchImages = async (movie_id, movie_lang, backdrop_lang) => {
  try {
    const logoRes = await axios.get(MOVIE_IMAGES_URL(movie_id, "en"));
    let logos = logoRes.data.logos;

    if (logos.length === 0) {
      const logoRes = await axios.get(MOVIE_IMAGES_URL(movie_id, movie_lang));
      logos = logoRes.data.logos;
    }

    const backdropRes = await axios.get(
      MOVIE_IMAGES_URL(movie_id, backdrop_lang),
    );
    const backdrops = backdropRes.data.backdrops;

    return { logos, backdrops };
  } catch (err) {
    console.error(err);
  }
};

// FETCH SERIES IMAGES
export const fetchImagesSeries = async (
  series_id,
  series_lang,
  backdrop_lang,
) => {
  try {
    const logoRes = await axios.get(SERIES_IMAGES_URL(series_id, "en"));
    let logos = logoRes.data.logos;

    if (logos.length === 0) {
      const logoRes = await axios.get(
        SERIES_IMAGES_URL(series_id, series_lang),
      );
      logos = logoRes.data.logos;
    }

    const backdropRes = await axios.get(
      SERIES_IMAGES_URL(series_id, backdrop_lang),
    );
    const backdrops = backdropRes.data.backdrops;

    return { logos, backdrops };
  } catch (err) {
    console.error(err);
  }
};
