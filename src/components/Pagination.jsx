import React from 'react';

function Pagination({ handlePrev, handleNext, pageNo }) {
  return (
    <div className="flex items-center justify-center mt-10 space-x-6">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        className="flex items-center px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={pageNo === 1}
      >
        <i className="fa-solid fa-arrow-left mr-2"></i>
        Prev
      </button>

      {/* Page Number */}
      <div className="px-6 py-2 bg-white border rounded-lg shadow font-semibold text-gray-700">
        Page {pageNo}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="flex items-center px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition duration-200 shadow-sm hover:shadow-md"
      >
        Next
        <i className="fa-solid fa-arrow-right ml-2"></i>
      </button>
    </div>
  );
}

export default Pagination;
