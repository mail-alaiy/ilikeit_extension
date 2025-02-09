const Primarybutton = ({ title, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-black text-lg font-semibold text-white py-3 rounded-full border-2 border-black drop-shadow-md cursor-pointer transition-all hover:bg-gray-900 ${className}`}
    >
      {title}
    </button>
  );
};

export default Primarybutton;
