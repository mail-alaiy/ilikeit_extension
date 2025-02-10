import Header from "../../components/Header";
import LeftPanel from "../../components/LeftPanel";

const RightPanel = () => {
  return (
    <div className="container divContainer flex-1 flex-col">
      <h2 className="text-lg font-bold mb-4">Image Upload Guidelines</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Example images */}
        <div className="relative">
          <img
            src="/example-portrait-1.jpg"
            alt="Portrait example"
            className="w-full rounded-md border border-green-500"
          />
          <span className="absolute top-2 left-2 bg-green-500 text-white text-sm font-bold rounded-full p-1">
            ✔
          </span>
        </div>
        <div className="relative">
          <img
            src="/example-portrait-2.jpg"
            alt="Portrait example"
            className="w-full rounded-md border border-green-500"
          />
          <span className="absolute top-2 left-2 bg-green-500 text-white text-sm font-bold rounded-full p-1">
            ✔
          </span>
        </div>
        <div className="relative">
          <img
            src="/example-landscape-1.jpg"
            alt="Landscape example"
            className="w-full rounded-md border border-red-500"
          />
          <span className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold rounded-full p-1">
            ✖
          </span>
        </div>
        <div className="relative">
          <img
            src="/example-landscape-2.jpg"
            alt="Landscape example"
            className="w-full rounded-md border border-red-500"
          />
          <span className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold rounded-full p-1">
            ✖
          </span>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        <span className="text-red-500 font-bold">✖</span> Only portrait images
        are allowed, landscape is not.
      </p>
    </div>
  );
};

const ImageUploadPage = () => {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 py-5 container2">
          {/* Left Panel */}
          <LeftPanel />
          {/* Right Panel */}
          <RightPanel />
        </div>
      </div>
    </>
  );
};

export default ImageUploadPage;
