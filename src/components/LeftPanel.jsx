import { useEffect, useState } from "react";
import { setPresignedUrl } from "../store/authSlice";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import ImageUploadContainer from "./ImageUploadContainer";
import FormButtons from "./FormButtons";


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

const LeftPanel = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [storedImage, setStoredImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    chrome.storage.local.get("presignedUrl", (result) => {
      if (result.presignedUrl) {
        setStoredImage(result.presignedUrl);
        console.log("Loaded image from storage:", result.presignedUrl);
      }
    });
  }, []);

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

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 2000); // Clear error after 2 seconds
  };

  const handleRemove = () => {
    if (!image && !storedImage) {
      showError("No image to remove!");
      return;
    }
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
    if (!image) {
      showError("Please upload an image before submitting!");
      return;
    }

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
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 5000);
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
      {showModal && <Modal onClose={() => setShowModal(false)} />}
      {errorMessage && (
        <div className="text-red-500 text-sm text-center">{errorMessage}</div>
      )}
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
