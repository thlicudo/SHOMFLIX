import { useState, useEffect } from "react";
import {
  useFetchDiscoverSeries,
  useFetchTopRatedSeries,
} from "../hooks/useFetchSeries";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import MovieCard from "../components/MovieCard";
import useShowTrailer from "../hooks/useShowTrailer";
import FeaturedCard from "../components/FeaturedCard";
import MovieTrailer from "../components/MovieTrailer";

const TvShows = ({ query }) => {
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const series = useFetchDiscoverSeries(page);
  const topRated = useFetchTopRatedSeries();

  const { showTrailer, setShowTrailer } = useShowTrailer();

  useInfiniteScroll(isFetching, setIsFetching, setPage);

  const handleShowTrailer = (series) => {
    setSelectedSeries(series);
    setShowTrailer(true);
  };

  useEffect(() => {
    if (series.length > 0) {
      setIsFetching(false);
    }
  }, [series]);

  return (
    <div className={`${query !== "" ? "hidden" : "block"}`}>
      {showTrailer && (
        <MovieTrailer
          setShowTrailer={setShowTrailer}
          showTrailer={showTrailer}
          movie={selectedSeries}
        />
      )}

      {/* FEATURED SERIES */}
      <section className="flex h-full items-center justify-center lg:h-screen">
        <FeaturedCard
          movies={topRated}
          handleShowTrailer={handleShowTrailer}
          link={"tv"}
        />
      </section>

      {/* SERIES LIST */}
      <section className="mt-8 translate-y-0 lg:mt-0 lg:-translate-y-24">
        <div className="h-full w-full px-4 sm:top-[8rem] sm:px-6 md:px-12 lg:px-10">
          <h1 className="pb-2 text-xl font-bold md:text-base lg:pb-4 lg:text-2xl">
            TV Shows
          </h1>
          <div className="pb-10">
            <div className="flex flex-wrap gap-y-1 md:gap-y-4">
              {series.map((series) => (
                <MovieCard key={series.id} movie={series} link={"tv"} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TvShows;
