import Container from "../../components/Container";
import Header from "../../components/Header";
import Carousel from "../../components/Carousel";
import { useState, useEffect } from "react";

const TryOn = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = () => {
      chrome.storage.local.get("responseList", (items) => {
        const responseList = items.responseList || [];
        const imageUrls = responseList.map((response) => response.result_url);
        setImages(imageUrls);
      });
    };

    fetchImages();

    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === "local" && changes.responseList) {
        fetchImages();
      }
    });

    return () => {
      chrome.storage.onChanged.removeListener(fetchImages);
    };
  }, []);

  return (
    <div>
      <Header />
      <Container>
      <Carousel images={images} width="w-[300px]" height="h-[450px]" />
      {/* <Primarybutton title="Shop Now" /> */}
      </Container>
    </div>
  );
};

export default TryOn;
