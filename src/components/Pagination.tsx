interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    paginate: (pageNumber: number) => void;
  }
  
  const Pagination: React.FC<PaginationProps> = ({ currentPage, totalItems, itemsPerPage, paginate }) => {
    return (
      <div className="flex justify-center mt-4">
        <div className="flex justify-center mt-4">
          <div className="flex justify-center mt-4">
            <div className="flex items-center justify-center pt-6">
              {currentPage > 1 && (
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className="mx-1 cursor-pointer text-sm font-semibold text-gray-900"
                >
                  <span className="hidden lg:block text-base">&larr; Previous</span>
                  <span className="block lg:hidden">&larr;</span>
                </button>
              )}
              {Array.from(
                { length: Math.ceil(totalItems/ itemsPerPage) },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 ${
                      currentPage === i + 1
                        ? "bg-gray-500"
                        : "hover:bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
              {currentPage < Math.ceil(totalItems / itemsPerPage) && (
                <button
                  onClick={() => paginate(currentPage + 1)}
                  className="mx-2 text-sm font-semibold text-gray-900 cursor-pointer"
                >
                  <span className="hidden lg:block text-base">Next &rarr;</span>
                  <span className="block lg:hidden">&rarr;</span>
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    );
  };

export default Pagination;