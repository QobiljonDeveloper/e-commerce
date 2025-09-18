import { memo } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { ICartProduct } from "../../../types";

const Completed = () => {
  const cart: ICartProduct[] = useSelector(
    (state: { cart: { value: ICartProduct[] } }) => state.cart.value
  );
  const location = useLocation();
  const checkoutData =
    location.state || JSON.parse(localStorage.getItem("checkoutData") || "{}");

  const { total = 0, payment = "unknown" } = checkoutData;

  const orderId = `#${Math.floor(Math.random() * 9000 + 1000)}_${Date.now()
    .toString()
    .slice(-5)}`;

  const today = new Date().toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto shadow-lg w-[738px] h-[730px] py-20 px-24 flex items-center flex-col">
      <h2 className="text-[28px] font-medium text-[#6C7275]">Thank you! 🎉</h2>
      <h4 className="text-[#23262F] font-medium text-[40px] mb-8">
        Your order has been received
      </h4>

      <div className="flex gap-10 mb-10">
        {cart?.map((item) => (
          <div
            key={item.id}
            className="relative w-20 h-20 bg-[#F3F5F7] flex items-center justify-center rounded-lg"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-20 h-20 object-contain"
            />
            <span className="absolute top-[-4px] right-[-4px] bg-black text-white text-xs px-2 py-0.5 rounded-full">
              {item.quantity}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-center w-full mt-6">
        <div className="space-y-2 text-lg text-[#23262F] text-left">
          <p>
            <span className="font-medium">Order code:</span> {orderId}
          </p>
          <p>
            <span className="font-medium">Date:</span> {today}
          </p>
          <p>
            <span className="font-medium">Total:</span> ${total.toFixed(2)}
          </p>
          <p>
            <span className="font-medium">Payment method:</span>{" "}
            {payment === "card" ? "Credit Card" : payment}
          </p>
        </div>
      </div>

      <Link
        to="/purchase-history"
        className="mt-8 px-10 py-3 bg-black rounded-full text-white hover:underline"
      >
        Purchase history
      </Link>
    </div>
  );
};

export default memo(Completed);
