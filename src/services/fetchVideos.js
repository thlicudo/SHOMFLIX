import axios from "axios";
import API_KEY from "./API";

const MOVIE_VIDEOS_URL = (id, lang, country) =>
  `https://api.themoviedb.org/3/movie/${id}/videos?language=${lang + "-" + country}&api_key=${API_KEY}`;

const SERIES_VIDEOS_URL = (id, lang, country) =>
  `https://api.themoviedb.org/3/tv/${id}/videos?language=${lang + "-" + country}&api_key=${API_KEY}`;

// API FETCH FOR MOVIE VIDEOS
export const fetchVideosMovie = async (id, lang, country) => {
  try {
    let res = await axios.get(MOVIE_VIDEOS_URL(id, "en", "US"));
    let videos = res.data.results;

    if (videos.length === 0) {
      res = await axios.get(MOVIE_VIDEOS_URL(id, lang, country));
      videos = res.data.results;
    }

    let trailer = videos.filter(
      (video) => video.type === "Trailer" && video.name.includes("Trailer"),
    );

    return { trailer, videos };
  } catch (err) {
    console.error(err);
  }
};

// API FETCH FOR SERIES VIDEOS
export const fetchVideosSeries = async (id, lang, country) => {
  try {
    let res = await axios.get(SERIES_VIDEOS_URL(id, "en", "US"));
    let videos = res.data.results;

    if (videos.length === 0) {
      res = await axios.get(SERIES_VIDEOS_URL(id, lang, country));
      videos = res.data.results;
    }

    let trailer = videos.filter(
      (video) => video.type === "Trailer" && video.name.includes("Trailer"),
    );

    if (trailer.length === 0) {
      trailer = videos.filter(
        (video) =>
          video.type === "Clip" ||
          videos.filter((video) => video.type === "Teaser"),
      );
    }

    return { trailer, videos };
  } catch (err) {
    console.error(err);
  }
};
