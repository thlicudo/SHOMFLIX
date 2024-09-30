import { useParams } from "react-router-dom";
import { useGetMovieDetail } from "../hooks/useGetDetails";
import { IoPlay } from "react-icons/io5";
import { format } from "date-fns";
import CastSlider from "../components/CastSlider";
import VideoSlider from "../components/VideoSlider";
import MovieTrailer from "../components/MovieTrailer";
import useShowTrailer from "../hooks/useShowTrailer";
import RatingMeter from "../components/RatingMeter";

const MoviePage = ({ query }) => {
  const { id } = useParams();
  const { movieDetails, cast, imagePath } = useGetMovieDetail(id);
  const { showTrailer, setShowTrailer } = useShowTrailer();

  return (
    <div className={`${query !== "" ? "hidden" : "block"}`}>
      {movieDetails && (
        <div className="relative h-[100dvw] w-full sm:h-[75dvw] lg:h-[90vh]">
          <div className="relative h-full w-full">
            {/* BACKGROUND BACKDROP */}
            <img
              className="h-full w-full object-cover object-top"
              src={
                movieDetails.backdrop_path
                  ? imagePath + movieDetails.backdrop_path
                  : ""
              }
              alt={"No backdrop available"}
              loading="lazy"
            />

            {/* OVERLAY */}
            <div className="absolute top-0 h-full w-full overlay-backdrop"></div>
          </div>

          <div className="absolute top-0 flex h-full w-full translate-y-28 flex-col gap-8 px-6 sm:px-12 md:translate-y-36 lg:px-[10%]">
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-20">
              {/* POSTER */}
              <div className="aspect-[2/3] h-[20rem] flex-shrink-0 flex-grow-0 rounded-lg md:h-[25rem] lg:h-[28rem]">
                <img
                  className="h-full w-full rounded-lg object-cover"
                  src={
                    movieDetails.poster_path
                      ? imagePath + movieDetails.poster_path
                      : ""
                  }
                  alt={movieDetails.title + " || Poster"}
                  loading="lazy"
                />
              </div>

              {/* TOP DETAILS */}
              <div className="flex h-full w-fit flex-col items-center gap-4 lg:items-start lg:gap-4">
                <div className="flex flex-col items-center gap-4 lg:items-start">
                  {/* TITLE & YEAR */}
                  <div className="flex flex-col justify-center gap-1 text-2xl lg:flex-row lg:justify-start lg:text-4xl">
                    <h1 className="items-center gap-2 text-center font-bold lg:text-start">
                      {movieDetails.title}
                      <span className="ml-2 hidden opacity-80 lg:inline">
                        {movieDetails.release_date
                          ? `(${movieDetails.release_date.slice(0, 4)})`
                          : ""}
                      </span>
                    </h1>
                    <div className="flex items-center justify-center gap-2">
                      <h1 className="w-fit items-center justify-center rounded-sm border-2 border-solid px-2 py-1 text-base font-bold leading-none lg:hidden lg:text-lg">
                        {movieDetails.certification.certification}
                      </h1>
                      <h1 className="text-center opacity-80 lg:hidden lg:text-start">
                        {movieDetails.release_date
                          ? `(${movieDetails.release_date.slice(0, 4)})`
                          : ""}
                      </h1>
                    </div>
                  </div>

                  {/* RATING */}
                  <div className="w-fit lg:hidden">
                    <RatingMeter
                      rating={Math.round(movieDetails.vote_average * 10)}
                    />
                  </div>

                  <div className="flex items-center justify-center gap-2 opacity-80">
                    <h1 className="hidden w-fit items-center justify-center rounded-sm border-2 border-solid px-2 py-2 text-lg font-bold leading-none lg:flex">
                      {movieDetails.certification.certification}
                    </h1>

                    <h1 className="text-base lg:text-base">
                      Release Date:{" "}
                      {movieDetails.certification.release_date
                        ? format(
                            new Date(movieDetails.certification.release_date),
                            "MM/dd/yy",
                          )
                        : "N/A"}
                    </h1>
                  </div>
                </div>

                {/* RATING */}
                <div className="hidden lg:block">
                  <RatingMeter
                    rating={Math.round(movieDetails.vote_average * 10)}
                  />
                </div>

                {/* WATCH TRAILER BUTTON */}
                {movieDetails.videos.trailer &&
                  movieDetails.videos.trailer.length > 0 && (
                    <div className="my-4 lg:my-0">
                      <button
                        className="flex items-center gap-2 rounded-md bg-white px-2 py-1 font-bold text-black duration-200 ease-in-out hover:opacity-80 lg:text-xl"
                        onClick={() => setShowTrailer(true)}
                      >
                        <IoPlay /> Play Trailer
                      </button>
                    </div>
                  )}

                {/* TAGLINE */}
                {movieDetails.tagline !== "" && (
                  <div>
                    <h1 className="text-center text-sm italic opacity-70 lg:text-lg">
                      {'"' + movieDetails.tagline + '"'}
                    </h1>
                  </div>
                )}

                {/* DETAILS */}
                <div className="mt-8 flex w-full flex-col gap-2 lg:mt-0">
                  <h1 className="text-lg font-bold lg:text-xl">Overview</h1>
                  <p className="text-sm opacity-90 lg:text-base">
                    {movieDetails.overview}
                  </p>
                </div>
              </div>
            </div>

            <div className="pb-10 lg:mt-5 lg:pb-10">
              <h1 className="mb-4 text-lg font-bold lg:text-xl">Cast</h1>
              <div>
                <CastSlider cast={cast} />
              </div>
            </div>

            {movieDetails.videos.videos.length !== 0 && (
              <div className="pb-10 lg:pb-10">
                <h1 className="mb-4 text-lg font-bold lg:text-xl">Media</h1>
                <div>
                  <VideoSlider movie={movieDetails} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showTrailer ? (
        <MovieTrailer setShowTrailer={setShowTrailer} movie={movieDetails} />
      ) : (
        ""
      )}
    </div>
  );
};

export default MoviePage;
