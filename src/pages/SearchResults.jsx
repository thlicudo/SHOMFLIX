import React, { useState, useEffect } from "react";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { useGetSearchResults } from "../hooks/useGetSearchResults";
import MovieCard from "../components/MovieCard";

const SearchResults = ({ query }) => {
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const results = useGetSearchResults(query, page, { setPage });

  useInfiniteScroll(isFetching, setIsFetching, setPage);

  useEffect(() => {
    if (results.length > 0) {
      setIsFetching(false);
    }
  }, [results]);

  return (
    <>
      {query && (
        <section className="translate-y-[5rem] xs:translate-y-[8rem] lg:mt-0 lg:translate-y-36">
          <div className="h-full w-full px-4 sm:top-[8rem] sm:px-6 md:px-12 lg:px-10">
            <h1 className="pb-2 text-xl font-bold lg:pb-4 lg:text-2xl">
              Search Results
            </h1>
            <div className="pb-10">
              <div className="flex flex-wrap gap-y-1 md:gap-y-4">
                {results.map((result) => (
                  <MovieCard
                    key={result.id + "-" + result.media_type}
                    movie={result}
                    link={result.media_type === "movie" ? "movies" : "tv"}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SearchResults;
