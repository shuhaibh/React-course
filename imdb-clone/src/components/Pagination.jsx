import React from 'react';

function Pagination({ handlePrev, handleNext, pageNo }) {
  return (
    <div className="bg-gray-900 text-white p-6 mt-10 flex flex-col items-center space-y-4 shadow-md rounded-md">
      {/* Pagination Controls */}
      <div className="flex items-center space-x-10">
        <div
          onClick={handlePrev}
          className="hover:cursor-pointer hover:text-blue-400 transition"
        >
          <i className="fa-solid fa-arrow-left text-2xl"></i>
        </div>
        <div className="text-xl font-semibold">{pageNo}</div>
        <div
          onClick={handleNext}
          className="hover:cursor-pointer hover:text-blue-400 transition"
        >
          <i className="fa-solid fa-arrow-right text-2xl"></i>
        </div>
      </div>

      {/* Footer Signature */}
      <div className="text-sm text-gray-400">
        Made with 🖤 by <span className="text-blue-400 font-medium"><a href="https://www.linkedin.com/in/muhammad-shuhaibh/">Shuhaibh</a></span>
      </div>
    </div>
  );
}

export default Pagination;
