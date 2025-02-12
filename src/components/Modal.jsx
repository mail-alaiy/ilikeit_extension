import React from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/solid"; // Heroicons for the tick icon
import PrimaryButton from "./PrimaryButton";
import Overlay from "./Overlay";

const Modal = ({ onClose }) => {
  return (
    <>
      <Overlay />
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="divContainer bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4"
        >
          {/* Checkmark Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 10,
              delay: 0.2,
            }}
          >
            <CheckCircleIcon className="w-16 h-16 text-green-500" />
          </motion.div>

          {/* Success Message */}
          <h2 className="text-lg font-semibold text-gray-800">
            Image Uploading Successful!
          </h2>

          {/* Close Button */}
          <PrimaryButton
            title="ok"
            onClick={onClose}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          />
        </motion.div>
      </div>
    </>
  );
};

export default Modal;
