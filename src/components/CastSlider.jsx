const CastSlider = ({ cast }) => {
  const imagePath = `https://image.tmdb.org/t/p/w500/`;

  return (
    <div className="group relative">
      <div className="h-full w-full snap-x snap-mandatory overflow-x-scroll scroll-smooth">
        {cast && (
          <div className="flex h-full w-max gap-6">
            {cast.map((cast) => {
              return (
                <div key={cast.id} className="flex snap-start flex-col">
                  <div className="h-44 w-32 md:h-52 md:w-40">
                    <img
                      className="h-full w-full rounded-t-md object-cover object-top"
                      src={
                        cast.profile_path ? imagePath + cast.profile_path : ""
                      }
                      alt={cast.name + " Profile"}
                    />
                  </div>
                  <div className="flex w-32 flex-grow flex-col rounded-b-md bg-white p-2 text-center text-black md:w-40">
                    <h1 className="mb-1 text-xs font-bold lg:text-base">
                      {cast.name}
                    </h1>
                    <h2 className="text-xs opacity-80 lg:text-sm">
                      {cast.character
                        ? cast.character
                        : cast.roles?.[0]?.character}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CastSlider;
