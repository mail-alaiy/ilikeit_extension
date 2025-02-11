import { Check, X } from "lucide-react";

const TextGuidelines = () => {
  const guidelines = [
    {
      allowed: false,
      text: "Only portrait images are allowed, landscape is not.",
    },
    {
      allowed: true,
      text: "Capture from waist-up: Ensure the subject's upper body and face are visible clearly.",
    },
    {
      allowed: true,
      text: "Neutral background: Use a plain, light-colored background like a white or beige wall.",
    },
    {
      allowed: true,
      text: "Good lighting: Ensure the image is well-lit, with no harsh shadows or bright reflections.",
    },
    {
      allowed: false,
      text: "Avoid wearing glasses with reflective lenses that obscure the face.",
    },
    {
      allowed: false,
      text: "Do not use filters, effects, or heavy editing.",
    },
    {
      allowed: false,
      text: "Do not upload group photos or images with multiple faces.",
    },
  ];
  return (
    <div>
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

export default TextGuidelines;
