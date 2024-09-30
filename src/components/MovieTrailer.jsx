import { useState } from "react";
import { IoClose } from "react-icons/io5";

const MovieTrailer = ({ setShowTrailer, movie }) => {
  const [animation, setAnimation] = useState("animate-fade_in");

  if (!movie || !movie.videos || !movie.videos.trailer) {
    return null;
  }
  const trailer = movie.videos.trailer[0];

  const handleCloseButton = () => {
    setAnimation("animate-fade_out");
    setTimeout(() => {
      setShowTrailer(false);
    }, 500);
  };

  return (
    <div
      className={`fixed top-0 z-[999] flex h-[100dvh] w-[100dvw] items-center justify-center ${animation}`}
    >
      <div className="relative top-0 h-full w-full bg-black opacity-60"></div>
      {movie && (
        <div className="absolute flex aspect-video w-[95vw] flex-col rounded-xl bg-black sm:w-[85vw] lg:w-[65rem]">
          <div className="flex w-full items-center justify-between px-4 pt-4">
            <h1 className="text-lg font-bold md:text-2xl">Official Trailer</h1>
            <button onClick={handleCloseButton}>
              <IoClose className="h-8 w-8 duration-200 ease-in-out hover:opacity-80" />
            </button>
          </div>
          <div className="h-full w-full rounded-b-xl">
            <iframe
              className="h-full w-full rounded-b-xl"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieTrailer;
