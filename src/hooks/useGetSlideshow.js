import { useEffect, useState, useRef } from "react";

const FADE_DURATION = 500;
const SLIDESHOW_INTERVAL = 30000;

const useGetSlideshow = (movies) => {
  const [slideshow, setSlideshow] = useState();
  const [backdrop, setBackdrop] = useState();
  const [animationClass, setAnimationClass] = useState("animate-fade_in");
  const displayedMoviesRef = useRef(new Set());

  const imagePath = `https://image.tmdb.org/t/p/original/`;

  useEffect(() => {
    if (movies.length === 0) return;

    const displaySlideshow = () => {
      const displayedMovies = displayedMoviesRef.current;

      if (displayedMovies.size === movies.length) {
        displayedMovies.clear();
      }

      const getRandomIndex = () => {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * movies.length);
        } while (displayedMovies.has(randomIndex));
        displayedMovies.add(randomIndex);
        return randomIndex;
      };

      let randomIndex = getRandomIndex();

      while (
        movies[randomIndex].images.logos.length === 0 ||
        movies[randomIndex].videos.trailer.length === 0
      ) {
        if (displayedMovies.size === movies.length) {
          displayedMovies.clear();
        }
        randomIndex = getRandomIndex();
      }

      const randomBackdrop = Math.floor(
        Math.random() * movies[randomIndex].images.backdrops.length,
      );

      setAnimationClass("animate-fade_out");
      setTimeout(() => {
        if (slideshow !== movies[randomIndex] || backdrop !== randomBackdrop) {
          setSlideshow(movies[randomIndex]);
          setBackdrop(randomBackdrop);
        }
        setAnimationClass("animate-fade_in");
      }, FADE_DURATION);
    };

    displaySlideshow();
    const interval = setInterval(displaySlideshow, SLIDESHOW_INTERVAL);

    return () => clearInterval(interval);
  }, [movies]);

  return { slideshow, backdrop, animationClass, imagePath };
};

export default useGetSlideshow;
