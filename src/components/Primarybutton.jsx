const PrimaryButton = ({ title, onClick, className, loading }) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center bg-green-600 text-lg font-semibold text-white py-2 px-6 rounded-lg border-2 border-green-700 shadow-[4px_4px_0px_black] cursor-pointer transition-all hover:bg-green-700 active:translate-y-1 active:shadow-[2px_2px_0px_black] ${
        loading ? "cursor-not-allowed" : ""
      } ${className}`}
      disabled={loading}
    >
      {loading ? (
        <>
          <div className="loader mr-2"></div>
        </>
      ) : (
        title
      )}
    </button>
  );
};

export default PrimaryButton;
