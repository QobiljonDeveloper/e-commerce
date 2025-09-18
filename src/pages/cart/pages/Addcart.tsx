import { lazy, Suspense, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { ICartProduct } from "../../../types";
import {
  removeFromCart,
  increaseAmount,
  decreaseAmount,
} from "../../../lib/features/cartSlice";

const RiCoupon4Line = lazy(() =>
  import("react-icons/ri").then((mod) => ({ default: mod.RiCoupon4Line }))
);

import noitemcart from "../../../assets/noitemcart.png";
import { Link, useNavigate } from "react-router-dom";

const AddCart = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("free");
  const [coupon, setCoupon] = useState("JenkateMW");
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const cart: ICartProduct[] = useSelector((state: any) => state.cart.value);
  const dispatch = useDispatch();

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupon.trim()) return;
    if (coupon === "JenkateMW") {
      console.log("✅ Coupon applied:", coupon);
      setIsCouponApplied(true);
    } else {
      console.log("❌ Invalid coupon:", coupon);
      setIsCouponApplied(false);
    }
    setCoupon("JenkateMW");
  };

  const methods = [
    { id: "free", label: "Free shipping", price: "$0.00" },
    { id: "express", label: "Express shipping", price: "+$15.00" },
    { id: "pickup", label: "Pick Up", price: "%21.00" },
  ];

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const total = useMemo(() => {
    let value = subtotal;
    if (selected === "express") value += 15;
    if (selected === "pickup") value *= 1.21;
    if (isCouponApplied) value -= 25;
    return value;
  }, [subtotal, selected, isCouponApplied]);

  if (!cart || cart.length === 0) {
    return (
      <div className="container flex flex-col justify-center items-center py-20">
        <Suspense fallback={<p>Loading...</p>}>
          <img
            src={noitemcart as unknown as string}
            alt="No items in cart"
            className="max-h-[500px] object-contain"
          />
        </Suspense>
        <Link
          to="/shop"
          className="max-w-[300px] w-full mt-6 bg-black text-white text-center py-3 px-2 rounded-lg hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="py-20 flex flex-col lg:flex-row justify-between gap-10 lg:gap-16">
        <div className="w-full lg:w-[643px] h-[482px] overflow-y-auto overflow-x-hidden rounded">
          <div className="min-h-[50px] border-b border-[#6C7275] flex justify-between px-4">
            <p className="font-medium text-[#121212]">Product</p>
            <div className="font-medium hidden sm:flex gap-6 md:gap-[74px] text-[#121212]">
              <p>Quantity</p>
              <p>Price</p>
              <p>Subtotal</p>
            </div>
          </div>

          <div className="h-[432px] overflow-y-auto overflow-x-hidden">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:h-[144px] border-b border-[#E8ECEF] px-4 gap-4"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.thumbnail}
                    className="w-20 h-24 object-cover rounded"
                    alt={item.title}
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold text-[#121212]">{item.title}</p>
                    {item.category && (
                      <p className="text-sm text-gray-500">
                        Category: {item.category}
                      </p>
                    )}
                    <button
                      className="text-sm font-semibold text-[#6C7275] text-start hover:underline mt-2"
                      onClick={() => dispatch(removeFromCart(item))}
                    >
                      X Remove
                    </button>
                  </div>
                </div>

                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-[74px] gap-3">
                  <div className="flex items-center border rounded w-fit">
                    <button
                      className="px-2 text-lg"
                      onClick={() =>
                        item.quantity > 1
                          ? dispatch(decreaseAmount(item))
                          : dispatch(removeFromCart(item))
                      }
                    >
                      −
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      className="px-2 text-lg"
                      onClick={() => dispatch(increaseAmount(item))}
                    >
                      +
                    </button>
                  </div>

                  <p className="text-center">${item.price}</p>
                  <p className="text-center font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[413px] border border-[#6C7275] rounded-[6px] p-6 flex flex-col">
          <p className="font-medium text-[20px] text-[#141718] mb-4">
            Cart summary
          </p>

          <div className="flex flex-col gap-3 text-[#141718] mb-4">
            {methods.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelected(method.id)}
                className={`border py-[13px] px-4 flex justify-between items-center rounded-[4px] cursor-pointer transition ${
                  selected === method.id
                    ? "bg-[#F3F5F7] border-black"
                    : "border-[#141718]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selected === method.id
                        ? "border-black"
                        : "border-gray-400"
                    }`}
                  >
                    {selected === method.id && (
                      <div className="w-2 h-2 rounded-full bg-black" />
                    )}
                  </div>
                  <button
                    className="hover:underline text-left"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelected(method.id);
                    }}
                  >
                    {method.label}
                  </button>
                </div>
                <p>{method.price}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between py-[13px] text-[#141718]">
            <p>Subtotal</p>
            <p className="font-semibold">${subtotal.toFixed(2)}</p>
          </div>

          {isCouponApplied && (
            <div className="flex justify-between py-[13px] text-green-600">
              <p>Coupon Discount</p>
              <p className="font-semibold">- $25.00</p>
            </div>
          )}

          <div className="flex justify-between text-base font-semibold py-[13px] text-[20px]">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>

          <button
            onClick={() =>
              navigate("/cart/checkout", {
                state: {
                  subtotal,
                  total,
                  method: selected,
                  couponApplied: isCouponApplied,
                },
              })
            }
            className="w-full mt-auto bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Checkout
          </button>
        </div>
      </div>

      <form
        onSubmit={handleApply}
        className="h-auto w-full sm:w-[424px] p-5 flex flex-col gap-3 mt-10"
      >
        <p className="font-medium text-[20px] text-[#141718]">Have a coupon?</p>
        <p className="text-[#6C7275] text-sm">
          Add your code for an instant cart discount
        </p>

        <div className="flex items-center border border-[#6C727580] overflow-hidden rounded-lg">
          <div className="pl-3 text-[#6C7275] text-lg">
            <Suspense fallback={<span>...</span>}>
              <RiCoupon4Line />
            </Suspense>
          </div>
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Coupon Code"
            className="flex-1 px-3 py-2 outline-none text-sm"
          />
          <button
            type="submit"
            className="px-5 py-2 font-medium text-sm cursor-pointer hover:bg-gray-300 transition"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCart;
