import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSeriesDetail } from "../hooks/useGetDetails";
import { format } from "date-fns";
import { IoPlay, IoChevronDown, IoChevronUp } from "react-icons/io5";
import CastSlider from "../components/CastSlider";
import VideoSlider from "../components/VideoSlider";
import MovieTrailer from "../components/MovieTrailer";
import useShowTrailer from "../hooks/useShowTrailer";
import RatingMeter from "../components/RatingMeter";

const SeriesPage = ({ query }) => {
  const { id } = useParams();
  const { seriesDetail, cast, imagePath } = useGetSeriesDetail(id);
  const { showTrailer, setShowTrailer } = useShowTrailer();
  const [showSeason, setShowSeason] = useState(false);

  const handleClick = () => {
    setShowSeason((prev) => !prev);
  };

  return (
    <div className={`${query !== "" ? "hidden" : "block"}`}>
      {seriesDetail && (
        <div className="relative h-[100dvw] w-full sm:h-[75dvw] lg:h-[90vh]">
          <div className="relative h-full w-full">
            {/* BACKGROUND BACKDROP */}
            <img
              className="h-full w-full object-cover object-top"
              src={
                seriesDetail.backdrop_path
                  ? imagePath + seriesDetail.backdrop_path
                  : ""
              }
              alt={seriesDetail.name + " || Backdrop"}
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
                    seriesDetail.poster_path
                      ? imagePath + seriesDetail.poster_path
                      : ""
                  }
                  alt={seriesDetail.name + " || Poster"}
                  loading="lazy"
                />
              </div>

              {/* TOP DETAILS */}
              <div className="flex h-full w-fit flex-col items-center gap-4 lg:items-start lg:gap-4">
                <div className="flex flex-col items-center gap-4 lg:items-start">
                  {/* TITLE & YEAR */}
                  <div className="flex flex-col justify-center gap-1 text-2xl lg:flex-row lg:justify-start lg:text-4xl">
                    <h1 className="items-center gap-2 text-center font-bold lg:text-start">
                      {seriesDetail.name}
                      <span className="ml-2 hidden opacity-80 lg:inline">
                        {seriesDetail.first_air_date
                          ? `(${seriesDetail.first_air_date.slice(0, 4)})`
                          : ""}
                      </span>
                    </h1>
                    <div className="flex items-center justify-center gap-2">
                      <h1 className="w-fit items-center justify-center rounded-sm border-2 border-solid px-2 py-1 text-base font-bold leading-none lg:hidden lg:text-lg">
                        {seriesDetail.content_ratings}
                      </h1>
                      <h1 className="text-center opacity-80 lg:hidden lg:text-start">
                        {seriesDetail.first_air_date
                          ? `(${seriesDetail.first_air_date.slice(0, 4)})`
                          : ""}
                      </h1>
                    </div>
                  </div>

                  {/* DISPLAY GENRE */}
                  <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                    {seriesDetail.genres.map((genre) => {
                      return (
                        <h1
                          key={genre.name}
                          className="rounded-xl border-2 border-solid p-1 px-3 text-xs"
                        >
                          {genre.name}
                        </h1>
                      );
                    })}
                  </div>

                  {/* RATING */}
                  <div className="w-fit lg:hidden">
                    <RatingMeter
                      rating={Math.round(seriesDetail.vote_average * 10)}
                    />
                  </div>

                  <div className="flex items-center justify-center gap-2 opacity-80">
                    <h1 className="hidden w-fit items-center justify-center rounded-sm border-2 border-solid px-2 py-2 text-lg font-bold leading-none lg:flex">
                      {seriesDetail.content_ratings}
                    </h1>

                    <div className="text-center lg:text-start">
                      <h1 className="text-base lg:text-base">
                        Release Date:{" "}
                        {seriesDetail.first_air_date
                          ? format(
                              new Date(seriesDetail.first_air_date),
                              "MM/dd/yy",
                            )
                          : "N/A"}
                      </h1>
                      <h1 className="text-base lg:text-base">
                        Status: {seriesDetail.status}
                      </h1>
                    </div>
                  </div>
                </div>

                {/* RATING */}
                <div className="hidden lg:block">
                  <RatingMeter
                    rating={Math.round(seriesDetail.vote_average * 10)}
                  />
                </div>

                {/* WATCH TRAILER BUTTON */}
                {seriesDetail.videos.trailer &&
                  seriesDetail.videos.trailer.length > 0 && (
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
                {seriesDetail.tagline !== "" && (
                  <div>
                    <h1 className="text-center text-sm italic opacity-70 lg:text-start lg:text-lg">
                      {'"' + seriesDetail.tagline + '"'}
                    </h1>
                  </div>
                )}

                {/* DETAILS */}
                <div className="mt-8 flex w-full flex-col gap-2 lg:mt-0">
                  <h1 className="text-lg font-bold lg:text-xl">Overview</h1>
                  <p className="text-sm opacity-90 lg:text-base">
                    {seriesDetail.overview}
                  </p>
                </div>
              </div>
            </div>

            {/* SEASONS */}
            <div className="lg:mt-5">
              <div
                className="flex cursor-pointer items-center justify-between bg-gray-300 bg-opacity-20 p-2 duration-200 ease-in-out md:p-4 lg:hover:bg-opacity-10"
                onClick={handleClick}
              >
                <h1 className="text-lg font-bold lg:text-xl">Seasons</h1>
                <div className="cursor-pointer duration-200 hover:opacity-80">
                  {!showSeason ? (
                    <IoChevronDown className="h-6 w-6" />
                  ) : (
                    <IoChevronUp className="h-6 w-6" />
                  )}
                </div>
              </div>
              <div
                className={`grid w-full gap-4 overflow-hidden bg-white bg-opacity-10 transition-all duration-500 ease-in-out ${
                  showSeason
                    ? "max-h-[500px] overflow-y-scroll px-2 py-4 md:max-h-[620px] md:p-6"
                    : "max-h-0"
                }`}
              >
                {seriesDetail.seasons.map((season) => (
                  <div key={season.id} className="flex w-full cursor-pointer rounded-md bg-white duration-200 lg:hover:scale-[1.01]">
                    <div className="aspect-[2/3] h-full w-[5rem] flex-shrink-0 shadow-[2px_0px_20px_0px_rgba(0,0,0,0.3)] shadow-black sm:w-[8rem]">
                      <img
                        className="h-full w-full rounded-l-md text-center text-black"
                        src={imagePath + season.poster_path}
                        alt={"No Poster Available"}
                      />
                    </div>
                    <div className="flex flex-col p-2 text-black md:p-4">
                      <h1 className="text-sm font-bold sm:text-base">
                        {season.name ? season.name : "N/A"}
                        <span className="mx-2 opacity-70">&#8226;</span>
                        <span className="text-xs opacity-70 sm:text-sm">
                          {season.season_number.length !== 0
                            ? "Season " + season.season_number
                            : "N/A"}
                        </span>
                      </h1>
                      <h2 className="text-xs opacity-70 sm:text-sm">
                        {season.episode_count
                          ? season.episode_count + " Episodes"
                          : "N/A"}
                      </h2>
                      <h2 className="mt-1 line-clamp-2 text-ellipsis text-xs opacity-80 sm:line-clamp-3 sm:text-sm md:line-clamp-4">
                        <span className="font-bold">Overview: </span>
                        {season.overview ? season.overview : "N/A"}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CAST */}
            <div className="pb-10 lg:pb-10">
              <h1 className="mb-4 text-lg font-bold lg:text-xl">Cast</h1>
              <div>
                <CastSlider cast={cast} />
              </div>
            </div>

            {seriesDetail.videos.videos.length !== 0 && (
              <div className="pb-10 lg:pb-10">
                <h1 className="mb-4 text-lg font-bold lg:text-xl">Media</h1>
                <div>
                  <VideoSlider movie={seriesDetail} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showTrailer ? (
        <MovieTrailer setShowTrailer={setShowTrailer} movie={seriesDetail} />
      ) : (
        ""
      )}
    </div>
  );
};

export default SeriesPage;
