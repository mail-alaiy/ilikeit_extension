const ImageUploadContainer = ({
    image,
    storedImage,
    rotation,
    handleImageUpload,
  }) => {
    return (
      <div className="container divContainer flex-1 flex-col py-10">
        <div className="w-full h-80 border-2 border-dashed border-gray-300 rounded-md flex justify-center items-center">
          {image || storedImage ? (
            <div
              className="relative w-full h-full flex justify-center items-center overflow-hidden"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: "transform 0.3s ease",
              }}
            >
              <img
                src={image ? image : storedImage}
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
      </div>
    );
  };

  export default ImageUploadContainer;