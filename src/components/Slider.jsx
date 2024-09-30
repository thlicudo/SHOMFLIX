import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";
import { useSliderHandle } from "../hooks/useSliderHandle";
import MovieCard from "./MovieCard";

const Slider = ({ movies, sliderText, link, explore }) => {
  const {
    scrollLeft,
    scrollRight,
    scrollAmount,
    sliderRef,
    scrollWidth,
    isScrolling,
  } = useSliderHandle();

  return (
    <div className="mt-2 lg:mt-8">
      <div className="flex items-baseline justify-between px-4 sm:px-6 lg:px-12">
        <h1 className="text-sm font-bold md:text-base lg:text-xl">
          {sliderText}
        </h1>
        <Link to={`/${explore}`}>
          <p className="flex items-center text-xs duration-200 ease-in-out hover:underline hover:opacity-80 md:text-sm lg:text-base">
            Explore All
            <span>
              <IoIosArrowForward />
            </span>
          </p>
        </Link>
      </div>
      <div className="group relative">
        <button
          className={`group/button absolute left-0 z-[99] hidden h-full w-[5rem] items-center justify-center bg-black bg-opacity-60 opacity-0 duration-200 ease-in-out hover:bg-opacity-80 group-hover:opacity-100 lg:flex ${scrollAmount === 0 ? "invisible" : "visible"}`}
          onClick={scrollLeft}
        >
          <IoChevronBackOutline className="h-10 w-10 duration-200 ease-in-out group-hover/button:scale-125" />
        </button>

        <button
          className={`group/button absolute right-0 z-[99] hidden h-full w-[5rem] items-center justify-center bg-black bg-opacity-60 opacity-0 duration-200 ease-in-out hover:bg-opacity-80 group-hover:opacity-100 lg:flex ${scrollAmount <= scrollWidth ? "visible" : "invisible"}`}
          onClick={scrollRight}
        >
          <IoChevronForwardOutline className="h-10 w-10 duration-200 ease-in-out group-hover/button:scale-125" />
        </button>

        <div
          className={`${isScrolling ? "pointer-events-none" : "pointer-events-auto"} scroller flex snap-x snap-mandatory overflow-x-scroll scroll-smooth py-2 px-4 md:py-4 lg:overflow-hidden lg:px-10`}
          ref={sliderRef}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
