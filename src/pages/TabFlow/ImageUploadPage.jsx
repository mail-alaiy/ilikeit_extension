import Header from "../../components/Header";
import LeftPanel from "../../components/LeftPanel";
import { Check, X } from 'lucide-react';
import image1 from "../../assets/1.jpeg";
import image2 from "../../assets/2.jpeg";
import image3 from "../../assets/3.jpeg";
import image4 from "../../assets/4.jpeg";
import image5 from "../../assets/5.jpeg";
import image6 from "../../assets/6.jpeg";

const RightPanel = () => {
  const guidelines1 = [
    {
      allowed: true,
      image:image1,
    },
    {
      allowed: true,
      image:image2,
    },
    {
      allowed: false,
      image:image3,
    },
    {
      allowed: false,
      image:image4,
    },
    {
      allowed: false,
      image:image5,
    },
    {
      allowed: false,
      image:image6,
    },
  ];
  const guidelines = [
    {
      allowed: false,
      text: 'Only portrait images are allowed, landscape is not.'
    },
    {
      allowed: true,
      text: 'Capture from waist-up: Ensure the subject\'s upper body and face are visible clearly.'
    },
    {
      allowed: true,
      text: 'Neutral background: Use a plain, light-colored background like a white or beige wall.'
    },
    {
      allowed: true,
      text: 'Good lighting: Ensure the image is well-lit, with no harsh shadows or bright reflections.'
    },
    {
      allowed: false,
      text: 'Avoid wearing glasses with reflective lenses that obscure the face.'
    },
    {
      allowed: false,
      text: 'Do not use filters, effects, or heavy editing.'
    },
    {
      allowed: false,
      text: 'Do not upload group photos or images with multiple faces.'
    }
  ];
  return (
    <div className="container divContainer flex-1 flex-col">
      <h2 className="text-lg font-bold mb-4">Image Upload Guidelines</h2>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {guidelines1.map((guideline, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="relative">
              <img
                src={guideline.image}
                alt={`Guideline ${index + 1}`}
                className="h-32 w-32 object-cover mb-2" // Size the images in the grid
              />
              {/* Tick or Cross on the image */}
              <div className="absolute top-0 right-0">
                {guideline.allowed ? (
                  <Check className="h-6 w-6 text-green-500" />
                ) : (
                  <X className="h-6 w-6 text-red-500" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ul className="space-y-3">
        {guidelines.map((guideline, index) => (
          <li key={index} className="flex items-start gap-3 w-full">
            {guideline.allowed ? (
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            ) : (
              <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            )}
            <span className="text-sm text-gray-700">{guideline.text}</span>
          </li>
        ))}
      </ul>
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
