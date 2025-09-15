import React, { useState } from "react";
import stol from "../../assets/stol.jpg";
import stol1 from "../../assets/stol1.jpg";
import stol2 from "../../assets/stol2.jpg";
import stol3 from "../../assets/stol3.jpg";

const ProductImages: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [stol, stol1, stol2, stol3];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col">
      <div className="relative group ">
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <span className="bg-white text-black w-[80px] text-center font-bold px-3 py-1 rounded-md ">
            NEW
          </span>
          <span className="bg-green-600 w-[80px] text-white text-center text-xs font-bold px-3 py-1 rounded-md">
            -50%
          </span> 
        </div>


        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <img
          src={images[currentImage]}
          alt="Product main"
          className="w-full h-[480px] md:h-[520px] object-cover rounded-lg"
          style={{ filter: 'brightness(0.8) contrast(1.1) grayscale(0.1)' }}
        />
      </div>

      <div className="flex gap-3 mt-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
              currentImage === index
                ? "border-black"
                : "border-gray-200 hover:border-gray-400"
            }`}
            onClick={() => setCurrentImage(index)}
          >
            <img
              src={image}
              alt={`thumb ${index + 1}`}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.8) contrast(1.1) grayscale(0.1)' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
