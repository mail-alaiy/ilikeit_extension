const VideoPlayer = () => {
  return (
    <div className="container divContainer items-center justify-center flex">
      <div className="w-full max-w-5xl aspect-w-16 aspect-h-9 min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
        <iframe
          className="w-full h-full min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px]"
          src="https://www.youtube.com/embed/xvFZjo5PgG0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPlayer;
