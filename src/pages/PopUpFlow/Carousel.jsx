import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border border-black px-4 py-2 rounded-full shadow-lg z-10 hover:bg-gray-200"
    onClick={onClick}
  >
    <span className="text-black font-bold text-lg">L</span>
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border border-black px-4 py-2 rounded-full shadow-lg z-10 hover:bg-gray-200"
    onClick={onClick}
  >
    <span className="text-black font-bold text-lg">R</span>
  </button>
);

const Carousel = ({ images, width, height }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className={`relative mx-auto mb-4 ${width} ${height} overflow-hidden`}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="flex justify-center">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full max-w-[300px] h-[450px] object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
