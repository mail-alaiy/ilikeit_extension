import ImageGuidelines from './ImageGuidelines';
import TextGuidelines from './TextGuidelines';

const RightPanel = () => {
    return (
      <div className="container divContainer flex-1 flex-col">
        <h2 className="text-lg font-bold mb-4">Image Upload Guidelines</h2>
        <ImageGuidelines/>
        <TextGuidelines/>
        </div>
    );
  };

  export default RightPanel;