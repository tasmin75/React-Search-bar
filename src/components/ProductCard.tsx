import React from 'react'

type ProductCardProps = {
        productId: string;
        productImg: string;
        productName: string;
    }

const ProductCard = ({productImg,productName,productId}: ProductCardProps) => {
  return (
    <div className="relative mt-5 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md" key={productId}>
              <div className="relative mx-3 mt-3 flex h-60 overflow-hidden">
                <img src={productImg} alt="product image" />
              </div>
              <div className="mt-4 px-5 pb-5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between">
                    <h1 className="inline-flex items-center text-lg font-semibold cursor-pointer w-[500px] truncate">
                      {productName}
                    </h1>
                  </div>
                </div>
               
              </div>
            </div>
  )
}

export default ProductCard
