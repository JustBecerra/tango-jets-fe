import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div className="flex justify-end  mt-1 space-x-2 p-2 rounded-3xl">
      {/* Botón Previous */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded-3xl bg-gray-400 ${
          currentPage === 1
            ? "text-gray-600 cursor-not-allowed"
            : "text-black hover:bg-gray-700"
        }`}
      >
        Previous
      </button>

      {/* Números de página */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`px-4 py-2 border rounded-3xl bg-gray-400 ${
            currentPage === index + 1
              ? "bg-gray-600 text-black"
              : "text-black hover:bg-gray-700"
          }`}
        >
          {index + 1}
        </button>
      ))}

      {/* Botón Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded-3xl bg-gray-400 ${
          currentPage === totalPages
            ? "text-gray-600 cursor-not-allowed"
            : "text-gray-800 hover:bg-gray-700"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
