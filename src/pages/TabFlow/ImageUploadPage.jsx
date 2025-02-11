import Header from "../../components/Header";
import LeftPanel from "../../components/LeftPanel";
import RightPanel from "../../components/RightPanel";

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
