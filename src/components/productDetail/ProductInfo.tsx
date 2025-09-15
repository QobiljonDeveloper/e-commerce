import React, { useState } from 'react';
import CountdownTimer from './CountdownTimer';

const ProductInfo: React.FC = () => {
  const [count, setCount] = useState(1);



  const inc = () => {
    setCount(prev => prev + 1);
  };

  const dec = () => {
    if (count > 1) {
      setCount(prev => prev - 1);
    }
  };

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
        <span className="text-sm text-gray">11 Reviews</span>
      </div>


      <h1 className="text-3xl font-bold text-gray-900">Tray Table</h1>


      <p className="text-gray-600 leading-relaxed">
        Buy one or buy a few and make every space where you sit more convenient. 
        Light and easy to move around with removable tray top, handy for serving snacks.
      </p>

      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-gray-900">$199.00</span>
        <span className="text-xl text-gray-400 line-through">$400.00</span>
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
        <button className="flex-1 border py-3 px-6 rounded">
          Wishlist
        </button>
        <button className="flex-1 bg-black text-white py-3 px-6 rounded">
          Add to Cart
        </button>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-500">
          <span>SKU: 1117</span>
          <span>Category: Living Room, Bedroom</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;

