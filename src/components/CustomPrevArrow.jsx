const CustomPrevArrow = ({ onClick }) => (
    <button
      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full shadow-lg z-10 hover:bg-opacity-80 transition-all duration-300"
      onClick={onClick}
    >
      ❮
    </button>
  );

  export default CustomPrevArrow;