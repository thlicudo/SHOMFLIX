import { Link } from "react-router-dom";
import { IoInformationCircleOutline, IoPlay } from "react-icons/io5";
import { useFetchTrendingMovies } from "../hooks/useFetchMovies";
import useGetSlideshow from "../hooks/useGetSlideshow";

const Slideshow = ({ handleShowTrailer }) => {
  const trending = useFetchTrendingMovies();

  const { slideshow, backdrop, animationClass, imagePath } =
    useGetSlideshow(trending);

  return (
    <>
      {slideshow && (
        <div className={`relative h-full w-full ${animationClass}`}>
          <img
            className="h-full w-full object-cover object-top"
            src={imagePath + slideshow.images.backdrops[backdrop].file_path}
            alt={slideshow.title + " || Movie Image"}
            loading="lazy"
          />

          <div className="absolute top-0 h-full w-full overlay-mobile md:overlay"></div>

          <div className="absolute top-10 flex h-full flex-col justify-center pl-6 md:top-0 md:mt-10 md:pl-12 lg:mt-0 lg:pl-24">
            <div
              className={`pb-4 lg:pb-4 ${slideshow.images.logos[0].width < 200 ? "w-[5rem] md:w-max" : "w-[10rem] xs:w-[12rem] md:w-[15rem] lg:w-[20rem]"}`}
            >
              <img
                className="h-full w-full object-contain"
                src={imagePath + slideshow.images.logos[0].file_path}
                alt={slideshow.title + " || Movie Logo"}
                loading="lazy"
              />
            </div>

            <div className="mb-4 hidden max-w-[12rem] sm:max-w-xs md:mb-6 md:block md:max-w-sm lg:mb-8 lg:max-w-md">
              <p className="line-clamp-3 overflow-hidden text-ellipsis text-xs sm:text-sm lg:text-base">
                {slideshow.overview}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                className="flex items-center gap-1 rounded-sm bg-white px-1.5 py-1 text-sm text-black duration-200 hover:opacity-80 sm:px-2 sm:text-base md:px-3 md:text-lg lg:rounded-md lg:px-4 lg:text-xl"
                onClick={() => handleShowTrailer(slideshow)}
              >
                <span>
                  <IoPlay className="h-4 w-4 md:h-8 md:w-8" />
                </span>
                Play Trailer
              </button>
              <Link to={`/movies/${slideshow.id}`}>
                <button className="flex items-center gap-1 rounded-sm bg-[rgba(115,115,115,0.6)] px-1.5 py-1 text-sm duration-200 hover:opacity-80 sm:px-2 sm:text-base md:px-3 md:text-lg lg:rounded-md lg:px-4 lg:text-xl">
                  <span>
                    <IoInformationCircleOutline className="h-4 w-4 md:h-8 md:w-8" />
                  </span>
                  More Info
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Slideshow;
