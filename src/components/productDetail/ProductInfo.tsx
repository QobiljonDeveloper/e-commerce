import React, { useState, useEffect } from 'react';
import CountdownTimer from './CountdownTimer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '../../lib/features/wishlistSlice';
import { addToCart } from '../../lib/features/cartSlice';
import { FaHeart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
// import type { IProduct } from '../../types';

interface IProduct {
  id: number;
  price: number;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
}

interface ProductInfoProps {
  currentImage?: number;
}

const ProductInfo: React.FC<ProductInfoProps> = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const wishlist = useSelector((state: any) => state.wishlist.value);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`https://dummyjson.com/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const inc = () => {
    setCount(prev => prev + 1);
  };

  const dec = () => {
    if (count > 1) {
      setCount(prev => prev - 1);
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      dispatch(toggleLike(product));
      if (isLiked) {
        toast.success('Mahsulot wishlist dan olib tashlandi');
      } else {
        toast.success('Mahsulot wishlist ga qo\'shildi');
      }
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product as any));
      toast.success('Mahsulot savatga qo\'shildi');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const isLiked = wishlist.some((item: IProduct) => item.id === product.id);

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

      <p className="text-gray-600 leading-relaxed">
        {product.description}
      </p>

      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-gray-900">${product.price}</span>
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
          onClick={handleWishlistToggle}
          className={`flex-1 border py-3 px-6 rounded flex items-center justify-center gap-2 transition-colors ${
            isLiked 
              ? 'bg-red-50 border-red-200 text-red-600' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          {isLiked ? <FaHeart className="text-red-500" /> : <CiHeart />}
          {isLiked ? 'Wishlisted' : 'Wishlist'}
        </button>
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors"
        >
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