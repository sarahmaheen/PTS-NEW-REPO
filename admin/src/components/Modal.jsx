// // import React from 'react';

// // const Modal = ({ isOpen, onClose, children }) => {
// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
// //       <div className="bg-white rounded-lg shadow-lg p-4">
// //         <button onClick={onClose} className="absolute top-2 right-2 text-red-500">X</button>
// //         {children}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Modal;








import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal content container with responsive height */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-screen mx-4 overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          &times;
        </button>

        {/* Modal content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
