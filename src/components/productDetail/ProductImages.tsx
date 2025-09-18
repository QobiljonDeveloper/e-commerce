import React, { useEffect, useState } from "react";
import axios from "axios";
import { Atom } from "react-loading-indicators";

interface Iproduct {
  id: number;
  thumbnail: string;
  images: string[];
  title: string;
  description: string;
  price: number;
  category: string;
}

interface IResponse {
  limit: number;
  products: Iproduct[];
  skip: number;
  total: number;
}

interface ProductImagesProps {
  currentImage: number;
  setCurrentImage: (index: number) => void;
}

const ProductImages: React.FC<ProductImagesProps> = ({ currentImage, setCurrentImage }) => {
  const [data, setData] = useState<IResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Atom color="#3155cc" size="large" text="" textColor="" />
      </div>
    );

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!data) return null;

  const product = data.products[currentImage];

  return (
    <div className="flex flex-col">
      <div className="relative group">
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <span className="bg-white text-black w-[80px] text-center font-bold px-3 py-1 rounded-md">
            NEW
          </span>
          <span className="bg-green-600 w-[80px] text-white text-center text-xs font-bold px-3 py-1 rounded-md">
            -50%
          </span>
        </div>

        <button
          onClick={() => setCurrentImage((currentImage - 1 + data.products.length) % data.products.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => setCurrentImage((currentImage + 1) % data.products.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <img
          src={product.images[0]}
          alt="Product main"
          className="w-full h-[480px] md:h-[520px] object-cover rounded-lg"
        />
      </div>

      <div className="flex gap-3 mt-4 overflow-x-auto pb-2 no-scrollbar ">
        {data.products.slice(0, 30).map((item, index) => (
          <div
            key={item.id}
            className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 cursor-pointer transition-all duration-200 ${
              currentImage === index
                ? "border-black"
                : "border-gray-200 hover:border-gray-400"
            }`}
            onClick={() => setCurrentImage(index)}
          >
            <img
              src={item.images[0]}
              alt={`thumb ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;

