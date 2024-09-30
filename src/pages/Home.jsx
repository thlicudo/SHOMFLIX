import { useState } from "react";
import { useFetchSeries } from "../hooks/useFetchSeries";
import { useFetchMovies } from "../hooks/useFetchMovies";
import Slideshow from "../components/Slideshow";
import Slider from "../components/Slider";
import MovieTrailer from "../components/MovieTrailer";
import useShowTrailer from "../hooks/useShowTrailer";

const Home = ({ query }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const movies = useFetchMovies();
  const series = useFetchSeries();

  const { showTrailer, setShowTrailer } = useShowTrailer();
  const { popular, topRated, upcoming, nowPlaying } = movies;
  const { popularSeries, topRatedSeries } = series;

  const handleShowTrailer = (movie) => {
    setSelectedMovie(movie);
    setShowTrailer(true);
  };

  return (
    <div className={`${query !== "" ? "hidden" : "block"}`}>
      {showTrailer && (
        <MovieTrailer
          setShowTrailer={setShowTrailer}
          showTrailer={showTrailer}
          movie={selectedMovie}
        />
      )}

      <section className="h-[85vw] w-full xs:h-[70vw] sm:h-full lg:h-[95vh]">
        <Slideshow handleShowTrailer={handleShowTrailer} />
      </section>
      <section className="my-4 lg:-translate-y-20">
        {/* MOVIES */}
        <Slider
          movies={popular}
          sliderText={"Popular Movies"}
          link={"movies"}
          explore={"movies"}
        />
        <Slider
          movies={upcoming}
          sliderText={"Upcoming Movies"}
          link={"movies"}
          explore={"movies"}
        />
        <Slider
          movies={nowPlaying}
          sliderText={"Now Playing Movies"}
          link={"movies"}
          explore={"movies"}
        />
        <Slider
          movies={topRated}
          sliderText={"Top Rated Movies"}
          link={"movies"}
          explore={"movies"}
        />

        {/* TV SHOWS */}
        <Slider
          movies={topRatedSeries}
          sliderText={"Top Rated TV Shows"}
          link={"tv"}
          explore={"tv"}
        />
        <Slider
          movies={popularSeries}
          sliderText={"Popular TV Shows"}
          link={"tv"}
          explore={"tv"}
        />
      </section>
    </div>
  );
};

export default Home;
