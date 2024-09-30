import { useState, useEffect } from "react";
import {
  useFetchDiscoverMovies,
  useFetchTrendingMovies,
} from "../hooks/useFetchMovies";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import MovieCard from "../components/MovieCard";
import useShowTrailer from "../hooks/useShowTrailer";
import MovieTrailer from "../components/MovieTrailer";
import FeaturedCard from "../components/FeaturedCard";

const Movies = ({ query }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const movies = useFetchDiscoverMovies(page);
  const trending = useFetchTrendingMovies();

  const { showTrailer, setShowTrailer } = useShowTrailer();

  useInfiniteScroll(isFetching, setIsFetching, setPage);

  const handleShowTrailer = (movie) => {
    setSelectedMovie(movie);
    setShowTrailer(true);
  };

  useEffect(() => {
    if (movies.length > 0) {
      setIsFetching(false);
    }
  }, [movies]);

  return (
    <div className={`${query !== "" ? "hidden" : "block"}`}>
      {showTrailer && (
        <MovieTrailer
          setShowTrailer={setShowTrailer}
          showTrailer={showTrailer}
          movie={selectedMovie}
        />
      )}

      {/* FEATURED MOVIE */}
      <section className="flex h-full items-center justify-center lg:h-screen">
        <FeaturedCard
          movies={trending}
          handleShowTrailer={handleShowTrailer}
          link={"movies"}
        />
      </section>

      {/* MOVIE LIST */}
      <section className="mt-8 translate-y-0 lg:mt-0 lg:-translate-y-24">
        <div className="h-full w-full px-4 sm:top-[8rem] sm:px-6 md:px-12 lg:px-10">
          <h1 className="pb-2 text-xl font-bold md:text-base lg:pb-4 lg:text-2xl">
            Movies
          </h1>
          <div className="pb-10">
            <div className="flex flex-wrap gap-y-1 md:gap-y-4">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} link={"movies"} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Movies;
