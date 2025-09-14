import { memo, type FC, useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt, FaHeart } from "react-icons/fa";
import Title from "../title";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Atom } from "react-loading-indicators";

interface IData {
  id: number;
  title: string;
  thumbnail: string;
  rating: number;
  price: number;
  discountPercentage: number;
}

const ProductView = () => {
  const [liked, setLiked] = useState(false);
  const { data, error, loading } = useFetch("/products", { limit: 4 });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Atom color="#3155cc" size="large" text="" textColor="" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-semibold text-red-600 bg-red-100 px-6 py-3 rounded-lg">
          Error: {error.message}
        </p>
      </div>
    );
  }
  const products: IData[] = data?.products ?? [];
  return (
    <div className="w-full py-12">
      <div className="mb-12">
        <Title text="New Arrivals" link="products" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
        {products?.map((item) => {
          const discountedPrice = Math.round(
            item.price * (1 - item.discountPercentage / 100)
          );

          const fStar = Math.floor(item.rating);
          const hasHalf =
            item.rating - fStar >= 0.25 && item.rating - fStar <= 0.75;
          const pStar = hasHalf ? 1 : 0;
          const zStar = 5 - fStar - pStar;

          return (
            <Link
              to={`/products/${item.id}`}
              key={item.id}
              className="group w-[262px] h-[433px] transition overflow-hidden flex flex-col gap-3"
            >
              <div className="w-[262px] h-[349px] relative overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover shadow-md border"
                />

                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <p className="py-1 px-[14px] text-bold text-[16px] uppercase text-sy rounded-[4px]">
                    NEW
                  </p>
                  <p className="py-1 px-[14px] text-bold text-[16px] uppercase text-py bg-[#38CB89] rounded-[4px]">
                    -{Math.round(item.discountPercentage)}%
                  </p>
                </div>

                <div
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex justify-center items-center bg-white shadow opacity-0 group-hover:opacity-100 cursor-pointer transition"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setLiked(!liked);
                  }}
                >
                  {liked ? <FaHeart /> : <CiHeart />}
                </div>

                <div className="absolute bottom-4 left-0 w-full px-4 opacity-0 group-hover:opacity-100 transition">
                  <button
                    className="w-full bg-sy text-center py-2 text-white rounded-[8px] select-none"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("Add to cart:", item.id);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>

              <div className="flex flex-col flex-1 justify-between">
                <div className="flex items-center gap-[2px] text-sm">
                  {Array.from({ length: fStar }).map((_, i) => (
                    <FaStar key={`full-${i}`} />
                  ))}

                  {pStar === 1 && <FaStarHalfAlt key="half" />}

                  {Array.from({ length: zStar }).map((_, i) => (
                    <FaRegStar key={`empty-${i}`} />
                  ))}
                </div>

                <h3 className="font-semibold text-sy text-[16px] truncate">
                  {item.title}
                </h3>

                <div className="flex gap-3 ">
                  <p className="font-semibold text-sm text-[#121212]">
                    ${discountedPrice}
                  </p>
                  <p className="text-[#6C7275] text-sm line-through">
                    ${item.price}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default memo(ProductView);
