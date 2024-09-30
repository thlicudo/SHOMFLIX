const VideoSlider = ({ movie }) => {
  const videos = movie.videos.videos;

  return (
    <div className="h-full w-full overflow-x-scroll">
      {movie && (
        <div className="flex h-full w-max gap-4 pb-6">
          {videos.map((video) => {
            return (
              <div
                key={video.id}
                className="aspect-video w-[85vw] outline-none sm:w-[25rem] md:w-[30rem]"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${video.key}`}
                  className="h-full w-full"
                  allowFullScreen={true}
                  loading="lazy"
                ></iframe>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VideoSlider;
