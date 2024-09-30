import { useEffect, useRef } from "react";

const SCROLL_OFFSET = 1;
const DELAY = 1000;

const useInfiniteScroll = (isFetching, setIsFetching, setPage) => {
  const timeoutRef = useRef(null);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - SCROLL_OFFSET) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (!isFetching) {
          setPage((prevPage) => prevPage + 1);
          setIsFetching(true);
        }
      }, DELAY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isFetching]);
};

export default useInfiniteScroll;
