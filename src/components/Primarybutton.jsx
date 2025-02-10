const PrimaryButton = ({ title, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={` bg-green-600 text-lg font-semibold text-white py-2 rounded-lg border-2 border-green-700 shadow-[4px_4px_0px_black] cursor-pointer transition-all hover:bg-green-700 active:translate-y-1 active:shadow-[2px_2px_0px_black] ${className}`}
    >
      {title}
    </button>
  );
};

export default PrimaryButton;
