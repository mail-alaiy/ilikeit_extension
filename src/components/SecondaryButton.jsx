const SecondaryButton = ({ title, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={` bg-red-600 text-lg font-semibold text-white py-2 px-6  rounded-lg border-2 border-red-700 shadow-[4px_4px_0px_black] cursor-pointer transition-all hover:bg-red-700 active:translate-y-1 active:shadow-[2px_2px_0px_black] ${className}`}
    >
      {title}
    </button>
  );
};

export default SecondaryButton;
