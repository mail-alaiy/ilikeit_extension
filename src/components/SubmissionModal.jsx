import React from 'react';

const SubmissionModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null; // Don't render the modal if not visible

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-lg font-semibold">🎉 Submission Completed!</h2>
        <p className="text-gray-600">Your image has been successfully submitted.</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={onClose} // Close the modal when button is clicked
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SubmissionModal;
