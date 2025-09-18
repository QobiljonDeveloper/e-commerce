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
    <div className="mx-auto shadow-lg w-full max-w-[738px] min-h-[600px] py-10 sm:py-16 px-6 sm:px-12 lg:px-24 flex items-center flex-col text-center rounded-lg">
      <h2 className="text-[22px] sm:text-[28px] font-medium text-[#6C7275]">
        Thank you! 🎉
      </h2>
      <h4 className="text-[#23262F] font-medium text-[28px] sm:text-[40px] mb-8">
        Your order has been received
      </h4>

      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {cart?.map((item) => (
          <div
            key={item.id}
            className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[#F3F5F7] flex items-center justify-center rounded-lg"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-contain"
            />
            <span className="absolute top-[-6px] right-[-6px] bg-black text-white text-xs px-1.5 py-0.5 rounded-full">
              {item.quantity}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-center w-full mt-6">
        <div className="space-y-2 text-base sm:text-lg text-[#23262F] text-left">
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
        className="mt-10 px-6 sm:px-10 py-3 bg-black rounded-full text-white hover:bg-gray-800 transition"
      >
        Purchase history
      </Link>
    </div>
  );
};

export default memo(Completed);
