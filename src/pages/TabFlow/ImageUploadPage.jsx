import { useState, useRef } from "react";
import Header from "../../components/Header";

const ImageUploadPage = () => {
  const [image, setImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const imgRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setRotation(0); // Reset rotation
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRotate = (direction) => {
    setRotation((prev) => prev + (direction === "left" ? -90 : 90));
  };

  const handleRemove = () => {
    setImage(null);
    setRotation(0);
  };

  return (
    <>
      <Header />

      <div className="flex flex-col lg:flex-row justify-center items-start gap-8 p-5 bg-gray-100 min-h-screen">
        {/* Left Panel */}
        <div className="bg-white p-5 rounded-md shadow-md w-full lg:w-1/2 flex flex-col items-center">
          <div className="w-full h-80 border-2 border-dashed border-gray-300 rounded-md flex justify-center items-center">
            {image ? (
              <div
                className="relative w-full h-full flex justify-center items-center overflow-hidden"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: "transform 0.3s ease",
                }}
              >
                <img
                  ref={imgRef}
                  src={image}
                  alt="Uploaded"
                  className="object-contain max-w-full max-h-full"
                />
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="text-gray-500">
                  Click to upload image or drag and drop
                </div>
              </label>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => handleRotate("left")}
              disabled={!image}
              className={`px-4 py-2 rounded-md shadow-md ${
                !image ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white"
              }`}
            >
              Rotate Left
            </button>
            <button
              onClick={() => handleRotate("right")}
              disabled={!image}
              className={`px-4 py-2 rounded-md shadow-md ${
                !image ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white"
              }`}
            >
              Rotate Right
            </button>
          </div>

          <button
            onClick={handleRemove}
            disabled={!image}
            className={`mt-4 w-full py-2 rounded-md shadow-md ${
              !image ? "bg-gray-300 text-gray-500" : "bg-red-500 text-white"
            }`}
          >
            Remove
          </button>

          <button
            disabled={!image}
            className={`mt-4 w-full py-2 rounded-md shadow-md ${
              !image ? "bg-gray-300 text-gray-500" : "bg-green-500 text-white"
            }`}
          >
            Submit
          </button>
        </div>

        {/* Right Panel */}
        <div className="bg-white p-5 rounded-md shadow-md w-full lg:w-1/3">
          <h2 className="text-lg font-bold mb-4">Image Upload Guidelines</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Example images */}
            <div className="relative">
              <img
                src="/example-portrait-1.jpg"
                alt="Portrait example"
                className="w-full rounded-md border border-green-500"
              />
              <span className="absolute top-2 left-2 bg-green-500 text-white text-sm font-bold rounded-full p-1">
                ✔
              </span>
            </div>
            <div className="relative">
              <img
                src="/example-portrait-2.jpg"
                alt="Portrait example"
                className="w-full rounded-md border border-green-500"
              />
              <span className="absolute top-2 left-2 bg-green-500 text-white text-sm font-bold rounded-full p-1">
                ✔
              </span>
            </div>
            <div className="relative">
              <img
                src="/example-landscape-1.jpg"
                alt="Landscape example"
                className="w-full rounded-md border border-red-500"
              />
              <span className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold rounded-full p-1">
                ✖
              </span>
            </div>
            <div className="relative">
              <img
                src="/example-landscape-2.jpg"
                alt="Landscape example"
                className="w-full rounded-md border border-red-500"
              />
              <span className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold rounded-full p-1">
                ✖
              </span>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            <span className="text-red-500 font-bold">✖</span> Only portrait
            images are allowed, landscape is not.
          </p>
        </div>
      </div>
    </>
  );
};

export default ImageUploadPage;
