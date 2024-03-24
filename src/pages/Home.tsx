import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";

type OrderData = {
  id: string;
  title: string;
  category: string;
  brand: string;
  thumbnail: string;
};

const Order: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [search, setSearch] = useState("");
  const [filterProduct, setFilterProduct] = useState([]);
  const [products, setProducts] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://dummyjson.com/products");
      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (search.length >= 3) {
      const delayDebounceFn = setTimeout(() => {
        const filteredProducts: OrderData[] = products.filter((product) => {
          return (
            product.title.toLowerCase().trim().includes(search.toLowerCase().trim()) ||
            product.category.toLowerCase().includes(search.toLowerCase()) ||
            product.brand.toLowerCase().includes(search.toLowerCase())
          );
        });
        setFilterProduct(filteredProducts);
      }, 300); 
      return () => clearTimeout(delayDebounceFn);
    } else {
      setFilterProduct([]);
    }
  }, [search, products]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = (search.length >= 3 ? filterProduct : products).slice(startIndex, endIndex);

  return (
    <>
      <div className="p-4 sm:p-14">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold mb-4 sm:mb-0 text-center">Search Products with Pagination...</h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-5 px-2 sm:px-8 py-4 w-full rounded-md mt-4 sm:mt-7 bg-white shadow-lg">
          <div className="flex flex-col w-full">
            <div className="flex w-full sm:w-[400px] items-center p-2 border-2 border-gray-300 bg-white rounded-md gap-2">
              <IoSearchOutline className="text-gray-500 w-6 h-6" />
              <input
                type="text"
                className="border-none focus:outline-none w-full px-2"
                placeholder="Search for category, name, brand..."
                value={search}
                onChange={handleFilter}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <div className="flex justify-between items-center px-5">
            <h2 className="font-bold text-xl">Product Summary</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-4">
            {loading ? (
              <p>Loading...</p>
            ) : currentItems.length ? (
              currentItems.map((product) => (
                <div key={product.id} className="flex flex-col w-full sm:w-[280px] p-4 border-2 border-gray-300 rounded-md bg-white ">
                  <div className="w-full h-[200px]">
                    <img src={product.thumbnail} alt={product.title} className="w-full h-full" />
                  </div>
                  <div className="flex flex-col mt-3">
                    <h2 className="font-bold text-lg">{product.title}</h2>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
          {search.length >= 3 && (
            <Pagination currentPage={currentPage} totalItems={filterProduct.length} itemsPerPage={itemsPerPage} paginate={paginate} />
          )}
          {search.length < 3 && (
            <Pagination currentPage={currentPage} totalItems={products.length} itemsPerPage={itemsPerPage} paginate={paginate} />
          )}
        </div>
      </div>
    </>
  );
};

export default Order;
