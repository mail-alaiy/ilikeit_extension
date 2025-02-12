import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";
const FormButtons = ({
    image,
    handleRemove,
    storedImage,
    handleSubmit,
    loading,
  }) => {
    return (
      <div className="container divContainer flex-1 flex-col py-10">
        <div className="flex gap-5">
          <SecondaryButton
            onClick={handleRemove}
            disabled={!image}
            title="Remove"
            className="flex-1 disabled:bg-gray-300"
          />
          <PrimaryButton
            disabled={!image}
            onClick={handleSubmit}
            loading={loading}
            title={storedImage ? "Submit Another" : "Submit"}
            className="flex-1 disabled:bg-gray-300"
          />
        </div>
      </div>
    );
  };

  export default FormButtons;