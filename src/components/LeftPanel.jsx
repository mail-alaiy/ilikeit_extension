import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";
import { useEffect, useState } from "react";
import { setPresignedUrl } from "../store/authSlice";
import { useDispatch } from "react-redux";

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

const FormButtons = ({
  image,
  handleRemove,
  storedImage,
  handleSubmit,
  loading,
}) => {
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
          onClick={handleSubmit}
          loading={loading}
          title={storedImage ? "Submit Another" : "Submit"}
          className="flex-1 disabled:bg-gray-300"
        />
      </div>
    </div>
  );
};
const LeftPanel = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [storedImage, setStoredImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    chrome.storage.local.get("presignedUrl", (result) => {
      if (result.presignedUrl) {
        setStoredImage(result.presignedUrl);
        console.log("Loaded image from storage:", result.presignedUrl);
      }
    });
  }, []);

  const dataURLtoFile = (dataUrl, filename) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

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
    setStoredImage(null);
    setRotation(0);

    // Remove the stored presigned URL from local storage
    chrome.storage.local.remove("presignedUrl", () => {
      console.log("Presigned URL removed from storage");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || loading) return;

    setLoading(true); // Start loading

    const file = dataURLtoFile(image, "uploaded_image.jpg");
    const apiUrl =
      "https://p35jn4hjb6.execute-api.us-east-1.amazonaws.com/version-1/upload?key=" +
      encodeURIComponent(file.name);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.message === "Upload successful") {
        const presignedUrl = data.presigned_url;
        dispatch(setPresignedUrl(presignedUrl));
        chrome.storage.local.set({ presignedUrl: presignedUrl });
        setStoredImage(presignedUrl);
        console.log("Presigned URL:", presignedUrl);
      } else {
        console.error("Error uploading image:", data.message);
      }
    } catch (error) {
      console.error("Error during the request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-4">
      <ImageUploadContainer
        storedImage={storedImage}
        image={image}
        rotation={rotation}
        handleImageUpload={handleImageUpload}
      />
      <FormButtons
        image={image}
        storedImage={storedImage}
        handleRemove={handleRemove}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default LeftPanel;
