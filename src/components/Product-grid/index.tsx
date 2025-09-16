import { memo } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt, FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../../lib/features/wishlistSlice";

interface IData {
  id: number;
  title: string;
  thumbnail: string;
  rating: number;
  price: number;
  discountPercentage: number;
}

interface ProductGridProps {
  data: IData[];
  loading?: boolean;
  error?: Error | null;
  limit?: number;
}

const ProductGrid = ({ data, loading, error, limit = 4 }: ProductGridProps) => {
  const wishlist = useSelector((state: any) => state.wishlist.value);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 place-items-center">
        {Array.from({ length: limit }).map((_, i) => (
          <div
            key={i}
            className="w-[262px] h-[433px] bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full py-10">
        <p className="text-lg font-semibold text-red-600 bg-red-100 px-4 py-2 rounded-lg">
          Error: {error instanceof Error ? error.message : String(error)}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
      {data?.map((item) => {
        const discountedPrice = Math.round(
          item.price * (1 - item.discountPercentage / 100)
        );

        const fStar = Math.floor(item.rating);
        const hasHalf =
          item.rating - fStar >= 0.25 && item.rating - fStar <= 0.75;
        const pStar = hasHalf ? 1 : 0;
        const zStar = 5 - fStar - pStar;

        const isLiked = wishlist.some((w: IData) => w.id === item.id);

        return (
          <Link
            to={`/products/${item.id}`}
            key={item.id}
            className="container group w-[262px] h-[433px] transition overflow-hidden flex flex-col gap-3"
          >
            <div className="w-[262px] h-[349px] relative overflow-hidden bg-[#F3F5F7]">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover shadow-md"
              />

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="py-1 px-3 text-xs font-semibold uppercase text-gray-800 bg-white rounded-md shadow">
                  NEW
                </span>
                <span className="py-1 px-3 text-xs font-semibold uppercase text-white bg-green-500 rounded-md shadow">
                  -{Math.round(item.discountPercentage)}%
                </span>
              </div>

              <button
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex justify-center items-center bg-white shadow opacity-0 group-hover:opacity-100 cursor-pointer transition"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dispatch(toggleLike(item));
                }}
              >
                {isLiked ? <FaHeart /> : <CiHeart />}
              </button>

              <div
                className="absolute bottom-4 left-0 w-full px-4 
                opacity-100 lg:opacity-0 lg:group-hover:opacity-100 
                transition"
              >
                <button
                  className="w-full bg-sy text-center py-2 text-white rounded-md select-none shadow"
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

              <h3 className="font-semibold text-gray-800 text-[16px] truncate">
                {item.title}
              </h3>

              <div className="flex gap-3 items-center">
                <p className="font-semibold text-sm text-gray-900">
                  ${discountedPrice}
                </p>
                <p className="text-gray-500 text-sm line-through">
                  ${item.price}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default memo(ProductGrid);
