import React, { useState, useEffect } from "react";
import CountdownTimer from "./CountdownTimer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../lib";
import { toggleLike } from "../../lib/features/wishlistSlice";
import { addToCart } from "../../lib/features/cartSlice";

interface IProduct {
  id: number;
  price: number;
  title: string;
  description: string;
  category: string;
}

interface IResponse {
  currentImage: number;
}

const ProductInfo: React.FC<IResponse> = ({ currentImage }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [count, setCount] = useState(1);

  const dispatch = useDispatch<AppDispatch>();
  const wishlist = useSelector((state: RootState) => state.wishlist.value);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  const inc = () => {
    setCount((prev) => prev + 1);
  };

  const dec = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  const product = products[currentImage] || products[0];
  const liked = wishlist.find((item) => item.id === product.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="flex text-yellow-400">
          <span className="text-lg">★</span>
          <span className="text-lg">★</span>
          <span className="text-lg">★</span>
          <span className="text-lg">★</span>
          <span className="text-lg">★</span>
        </div>
        <span className="text-sm text-gray-500">11 Reviews</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

      <p className="text-gray-600 leading-relaxed">{product.description}</p>

      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-gray-900">
          ${product.price}
        </span>
        <span className="text-xl text-gray-400 line-through">
          ${(product.price * 1.2).toFixed(2)}
        </span>
      </div>

      <CountdownTimer />

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-1">Measurements</h3>
        <p className="text-sm text-gray-600">17 1/2×20 5/8"</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={dec}
            className="px-3 py-2 hover:bg-gray-100 transition-colors"
            disabled={count <= 1}
          >
            -
          </button>
          <span className="px-4 py-2 border-x border-gray-300 min-w-[50px] text-center">
            {count}
          </span>
          <button
            onClick={inc}
            className="px-3 py-2 hover:bg-gray-100 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => dispatch(toggleLike(product))}
          className={`flex-1 border py-3 px-6 rounded cursor-pointer ${
            liked ? "bg-red-500 text-white" : ""
          }`}
        >
          {liked ? "Remove from Wishlist ❤️" : "Add to Wishlist 🤍"}
        </button>
        <button className="flex-1 bg-black text-white py-3 px-6 rounded cursor-pointer">
          Add to Cart
        </button>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-500">
          <span>SKU: {product.id}</span>
          <span>Category: {product.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
