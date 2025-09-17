import { RiCoupon4Line } from "react-icons/ri";
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { ICartProduct } from "../../../types";
import {
  removeFromCart,
  increaseAmount,
  decreaseAmount,
} from "../../../lib/features/cartSlice";

const AddCart = () => {
  const [selected, setSelected] = useState("free");
  const [coupon, setCoupon] = useState("");

  const cart: ICartProduct[] = useSelector((state: any) => state.cart.value);
  const dispatch = useDispatch();

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupon.trim()) return;

    console.log("Coupon applied:", coupon);
    setCoupon("");
  };

  const methods = [
    { id: "free", label: "Free shipping", price: "$0.00" },
    { id: "express", label: "Express shipping", price: "+$15.00" },
    { id: "pickup", label: "Pick Up", price: "%21.00" },
  ];

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const total = useMemo(() => {
    if (selected === "express") return subtotal + 15;
    if (selected === "pickup") return subtotal * 1.21;
    return subtotal;
  }, [subtotal, selected]);

  return (
    <div className="container">
      <div className="py-20 flex justify-between gap-16">
        <div className="w-[643px] h-[482px] overflow-y-auto overflow-x-hidden">
          <div>
            <div className="min-h-[50px] border-b border-[#6C7275] flex justify-between px-4">
              <p className="font-medium text-[#121212]">Product</p>
              <div className="font-medium flex gap-[74px] text-[#121212]">
                <p>Quantity</p>
                <p>Price</p>
                <p>Subtotal</p>
              </div>
            </div>

            <div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center h-[144px] border-b border-[#E8ECEF] px-4"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.thumbnail}
                      className="w-20 h-24 object-cover rounded"
                      alt={item.title}
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold text-[#121212]">
                        {item.title}
                      </p>
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

                  <div className="flex items-center gap-[74px]">
                    <div className="flex items-center border rounded">
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

                    <p className="w-16 text-center">${item.price}</p>
                    <p className="w-20 text-center font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-[476px] w-[413px] border border-[#6C7275] rounded-[6px] p-6 flex flex-col">
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

          <div className="flex justify-between text-base font-semibold py-[13px] text-[20px]">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>

          <button className="w-full mt-auto bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
            Checkout
          </button>
        </div>
      </div>

      <form
        onSubmit={handleApply}
        className="h-auto w-[424px] p-5 flex flex-col gap-3 mt-10"
      >
        <p className="font-medium text-[20px] text-[#141718]">Have a coupon?</p>
        <p className="text-[#6C7275] text-sm">
          Add your code for an instant cart discount
        </p>

        <div className="flex items-center border border-[#6C727580] overflow-hidden rounded-lg">
          <div className="pl-3 text-[#6C7275] text-lg">
            <RiCoupon4Line />
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
