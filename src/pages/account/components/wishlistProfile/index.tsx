import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../../../../lib";
import type { ICartProduct, IProduct } from "../../../../types";

import {
  addToCart,
  increaseAmount,
  decreaseAmount,
  removeFromCart,
  setQuantity,
} from "../../../../lib/features/cartSlice";

const WishlistProfile = () => {
  const wishlist: IProduct[] = useSelector(
    (state: RootState) => state.wishlist.value
  );
  const cart: ICartProduct[] = useSelector((state: any) => state.cart.value);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist?.map((item) => {
          const cartItem = cart.find((c) => c.id === item.id);

          return (
            <Link
              key={item.id}
              to={`/products/${item.id}`}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col"
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
                </div>

                {/* Add to cart / Counter */}
                <div className="mt-4">
                  {cartItem ? (
                    <div className="flex justify-between items-center gap-2 w-full bg-white rounded-lg shadow-md px-1">
                      <button
                        className="px-6 text-3xl font-medium hover:text-red-600 transition"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (cartItem.quantity > 1) {
                            dispatch(decreaseAmount(cartItem));
                          } else {
                            dispatch(removeFromCart(cartItem));
                          }
                        }}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={cartItem.quantity}
                        onFocus={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          e.stopPropagation();
                          const newValue = Number(e.target.value);
                          if (newValue > 0) {
                            dispatch(
                              setQuantity({ product: item, quantity: newValue })
                            );
                          } else {
                            dispatch(removeFromCart(cartItem));
                          }
                        }}
                        className="w-16 text-center text-2xl text-gray-900 border border-gray-300 rounded-md focus:outline-none"
                      />
                      <button
                        className="px-6 text-3xl font-medium hover:text-green-600 transition"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          dispatch(increaseAmount(cartItem));
                        }}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="w-full bg-black text-center py-2 text-white rounded-md select-none shadow hover:bg-gray-800 transition"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        dispatch(addToCart(item));
                      }}
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default memo(WishlistProfile);
