import { Link } from "react-router-dom";

const imagePath = `https://image.tmdb.org/t/p/w500/`;

const MovieCard = ({ movie, link }) => {
  return (
    <Link
      to={`/${link}/${movie.id}`}
      aria-label={`View details for ${movie.media_type === "movie" ? movie.title : movie.name}`}
      className="aspect-[2/3] max-h-1/3 flex-1/3 cursor-pointer px-0.5 duration-300 ease-in-out will-change-transform sm:max-h-1/4 sm:flex-1/4 md:max-h-1/5 md:flex-1/5 md:px-1 lg:max-h-1/7 lg:flex-1/7 lg:hover:scale-105 snap-center"
    >
      <div className="h-full w-full duration-300 ease-in-out lg:hover:shadow-[0_0_0_3px_rgba(255,255,255,1)]">
        <img
          className="h-full w-full"
          src={movie.poster_path ? imagePath + movie.poster_path : ""}
          alt={movie.media_type === "movie" ? movie.title : movie.name}
          loading="lazy"
        />
      </div>
    </Link>
  );
};

export default MovieCard;
