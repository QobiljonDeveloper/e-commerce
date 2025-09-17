import { memo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../lib";
import { Link } from "react-router-dom";

const WishlistProfile = () => {
  const wishlist = useSelector((state: RootState) => state.wishlist.value);

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist?.map((item) => (
          <Link
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col"
            key={item.id}
            to={`/products/${item.id}`}
          >
            <div className="relative">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-md">
                {item.availabilityStatus}
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-2 flex-1">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div>
                  <p className="text-xl font-bold">${item.price}</p>
                  <p className="text-sm text-gray-500">
                    ⭐ {item.rating.toFixed(1)} / 5
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Add to cart:", item.id);
                  }}
                  className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default memo(WishlistProfile);
