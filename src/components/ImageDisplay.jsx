import myImage from "../assets/banner.png"; // Adjust the path as needed

const ImageDisplay = () => {
  return (
    <div className="container divContainer items-center justify-center flex">
      <div className="w-full max-w-4xl aspect-w-16 aspect-h-9 min-h-[150px] sm:min-h-[200px] md:min-h-[300px] lg:min-h-[350px]">
        <img
          className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-md"
          src={myImage} 
          alt="Display"
        />
      </div>
    </div>
  );
};

export default ImageDisplay;
