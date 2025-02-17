import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full shadow-lg z-10 hover:bg-opacity-80 transition-all duration-300"
    onClick={onClick}
  >
    ❮
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full shadow-lg z-10 hover:bg-opacity-80 transition-all duration-300"
    onClick={onClick}
  >
    ❯
  </button>
);

const Carousel = ({ images, presignedUrl, width, height }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  return (
    <div
      className={`relative mx-auto ${width} ${height} overflow-hidden rounded-xl shadow-lg`}
    >
      {!presignedUrl ? (
        <div className="flex justify-center items-center w-full h-full bg-gray-100 text-xl font-semibold text-red-500 rounded-lg shadow-md p-6">
          Upload your Image
        </div>
      ) : images && images.length !== 0 ? (
        <Slider {...settings}>
          {images.map((image, index) => (
            <div
              key={index}
              className="flex justify-center overflow-hidden rounded-xl"
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full max-w-[450px] h-[500px] object-cover rounded-xl"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="flex justify-center items-center w-full h-full bg-gray-100 text-xl font-semibold text-red-500 rounded-lg shadow-md p-6">
          Start trying on!
        </div>
      )}
    </div>
  );
};

export default Carousel;
