import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt, FaHeart } from "react-icons/fa";
import { toggleLike } from "../../lib/features/wishlistSlice";
import wishlishEmpty from "../../assets/wishlistempty.webp";

interface IData {
  id: number;
  title: string;
  thumbnail: string;
  rating: number;
  price: number;
  discountPercentage: number;
}

const WishlistView = () => {
  const wishlist = useSelector((state: any) => state.wishlist.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!wishlist.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] gap-6 text-center">
        <img
          src={wishlishEmpty}
          alt="Wishlist empty"
          className="w-[220px] h-[220px] object-contain opacity-80"
        />
        <p className="text-lg font-medium text-gray-600">
          Your wishlist is empty 😔
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-sy text-white font-semibold rounded-lg shadow hover:bg-sy/90 transition"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container w-full py-12 px-8">
      <div className="mb-12">
        <h2 className="text-2xl font-bold">My Wishlist</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 place-items-center ">
        {wishlist.map((item: IData) => {
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
              className="group w-[262px] h-[433px] transition overflow-hidden flex flex-col gap-3 "
            >
              <div className="w-[262px] h-[349px] relative overflow-hidden bg-py">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover shadow-md"
                />

                <div
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex justify-center items-center bg-white shadow cursor-pointer transition"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(toggleLike(item));
                  }}
                >
                  <FaHeart />
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

export default memo(WishlistView);
