import { useEffect, useState } from "react";
import { IoInformationCircleOutline, IoPlay } from "react-icons/io5";
import { Link } from "react-router-dom";

const logoImg = `https://image.tmdb.org/t/p/w500/`;
const backdropImg = `https://image.tmdb.org/t/p/original/`;

const FeaturedCard = ({ movies, link, handleShowTrailer }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const selectRandomMovie = () => {
      const filteredMovies = movies.filter(
        (movie) => movie.images.logos.length !== 0,
      );

      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * filteredMovies.length);
      } while (filteredMovies[randomIndex]?.videos?.trailer.length === 0);

      setMovie(filteredMovies[randomIndex]);
    };

    selectRandomMovie();
  }, [movies]);

  return (
    <>
      {movie && (
        <div className="relative flex h-full w-full flex-col items-center gap-8 lg:flex-row lg:justify-start lg:px-20">
          <div className="absolute left-0 top-0 z-[-99] h-full w-full">
            <img
              className="h-full w-full object-cover object-top"
              src={backdropImg + movie.backdrop_path}
              alt=""
            />
          </div>
          <div className="absolute left-0 top-0 z-[-50] h-full w-full overlay-mobile md:overlay"></div>
          <div className="mt-28">
            {/* POSTER FOR MOBILE */}
            <div className="aspect-[2/3] w-[16rem] rounded-lg border-2 xs:w-[20rem] sm:w-[25rem] lg:hidden lg:w-[18rem]">
              <img
                className="h-full w-full rounded-lg"
                src={logoImg + movie.poster_path}
                alt=""
              />
            </div>

            {/* LOGO FOR DESKTOP */}
            <div className="-mt-[10rem] hidden flex-col gap-6 lg:flex">
              <div className="h-auto w-[20rem]">
                <img
                  className="h-full w-full"
                  src={logoImg + movie.images.logos[0].file_path}
                  alt="No available image"
                />
              </div>
              <div className="flex w-full max-w-[250px] gap-4 xs:max-w-[320px] lg:max-w-full lg:gap-4">
                {movie.videos.trailer.length > 0 && (
                  <button
                    className="flex flex-grow items-center justify-center gap-1 rounded-sm bg-white px-1.5 py-1 text-base text-black duration-200 hover:opacity-80 xs:gap-2 sm:px-2 sm:text-lg md:px-3 lg:rounded-md lg:px-4 lg:text-xl"
                    onClick={() => handleShowTrailer(movie)}
                  >
                    <span>
                      <IoPlay className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                    </span>
                    Play Trailer
                  </button>
                )}
                <Link to={`/${link}/${movie.id}`} className="flex flex-grow">
                  <button className="flex flex-grow items-center justify-center gap-1 rounded-sm bg-[rgba(115,115,115,0.6)] px-1.5 py-1 text-base duration-200 hover:opacity-80 xs:gap-2 sm:px-2 sm:text-lg md:px-3 lg:rounded-md lg:px-4 lg:text-xl">
                    <span>
                      <IoInformationCircleOutline className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                    </span>
                    More Info
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex h-full w-full flex-col items-center justify-end gap-4 pb-8 lg:hidden lg:max-w-[50%] lg:items-start lg:pb-12">
            <div className="flex w-full max-w-[250px] gap-4 xs:max-w-[320px] lg:max-w-[40%] lg:flex-col lg:gap-4">
              {movie.videos.trailer.length > 0 && (
                <button
                  className="flex flex-grow items-center justify-center gap-1 rounded-sm bg-white px-1.5 py-1 text-base text-black duration-200 hover:opacity-80 xs:gap-2 sm:px-2 sm:text-lg md:px-3 lg:rounded-md lg:px-4 lg:text-xl"
                  onClick={() => handleShowTrailer(movie)}
                >
                  <span>
                    <IoPlay className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                  </span>
                  Play Trailer
                </button>
              )}
              <Link to={`/${link}/${movie.id}`} className="flex flex-grow">
                <button className="flex flex-grow items-center justify-center gap-1 rounded-sm bg-[rgba(115,115,115,0.6)] px-1.5 py-1 text-base duration-200 hover:opacity-80 xs:gap-2 sm:px-2 sm:text-lg md:px-3 lg:rounded-md lg:px-4 lg:text-xl">
                  <span>
                    <IoInformationCircleOutline className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8" />
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

export default FeaturedCard;
