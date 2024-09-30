import { useEffect, useState } from "react";
import searchQuery from "../services/searchQuery";

// FETCH FOR MOVIES PAGE MOVIES
export const useGetSearchResults = (query, page, { setPage }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setPage(1);
      return;
    }

    const getResults = async () => {
      try {
        const newResults = await searchQuery(query, page);

        setResults((prevResults) =>
          page === 1 ? newResults : [...prevResults, ...newResults],
        );
      } catch (err) {
        console.error(err);
      }
    };
    getResults();
  }, [query, page, setPage]);

  useEffect(() => {
    setResults([]);
    setPage(1);
  }, [query, setPage]);

  return results;
};
