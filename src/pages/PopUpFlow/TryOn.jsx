import Container from "../../components/Container";
import Header from "../../components/Header";
import Carousel from "../../components/Carousel";
import { useState, useEffect } from "react";

const TryOn = () => {
  const [images, setImages] = useState([]);
  const [presignedUrl, setPresignedUrl] = useState(""); // State for presigned URL

  useEffect(() => {
    const fetchData = () => {
      chrome.storage.local.get(["responseList", "presignedUrl"], (items) => {
        const responseList = items.responseList || [];
        const imageUrls = responseList.map((response) => response.result_url);
        setImages(imageUrls);

        if (items.presignedUrl) {
          setPresignedUrl(items.presignedUrl); // Update presigned URL state
        }
      });
    };

    fetchData();

    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (
        areaName === "local" &&
        (changes.responseList || changes.presignedUrl)
      ) {
        fetchData();
      }
    });

    return () => {
      chrome.storage.onChanged.removeListener(fetchData);
    };
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <Carousel
          presignedUrl={presignedUrl}
          images={images}
          width="w-[300px]"
          height="h-[450px]"
        />
      </Container>
    </div>
  );
};

export default TryOn;
