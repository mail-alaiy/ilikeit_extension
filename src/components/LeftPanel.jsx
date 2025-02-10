import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";
import { useState, useRef } from "react";

const ImageUploadContainer = ({ image, rotation, handleImageUpload }) => {
  return (
    <div className="container divContainer flex-1 flex-col py-10">
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
    </div>
  );
};

const FormButtons = ({ image, handleRemove }) => {
  return (
    <div className="container divContainer flex-1 flex-col py-10">
      <div className="flex gap-5">
        <SecondaryButton
          onClick={handleRemove}
          disabled={!image}
          title="Remove"
          className="flex-1 disabled:bg-gray-300"
        />
        <PrimaryButton
          disabled={!image}
          title="Submit"
          className="flex-1 disabled:bg-gray-300"
        />
      </div>
    </div>
  );
};

const LeftPanel = () => {
  const [image, setImage] = useState(null);
  const [rotation, setRotation] = useState(0);

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

  const handleRemove = () => {
    setImage(null);
    setRotation(0);
  };

  return (
    <form className="flex-1 flex flex-col gap-4">
      <ImageUploadContainer
        image={image}
        rotation={rotation}
        handleImageUpload={handleImageUpload}
      />
      <FormButtons image={image} handleRemove={handleRemove} />
    </form>
  );
};

export default LeftPanel;
