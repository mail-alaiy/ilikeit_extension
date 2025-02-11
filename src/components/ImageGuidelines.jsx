import image1 from "../assets/1.jpeg";
import image2 from "../assets/2.jpeg";
import image3 from "../assets/3.jpeg";
import image4 from "../assets/4.jpeg";
import image5 from "../assets/5.jpeg";
import image6 from "../assets/6.jpeg";
import { Check, X } from "lucide-react";
const guidelines = [
  {
    allowed: true,
    image: image1,
  },
  {
    allowed: true,
    image: image2,
  },
  {
    allowed: false,
    image: image3,
  },
  {
    allowed: false,
    image: image4,
  },
  {
    allowed: false,
    image: image5,
  },
  {
    allowed: false,
    image: image6,
  },
];

const ImageGuidelines = () => {
  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      {guidelines.map((guideline, index) => (
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
  );
};

export default ImageGuidelines;
