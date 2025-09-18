import { memo, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  removeFromCart,
  increaseAmount,
  decreaseAmount,
} from "../../../lib/features/cartSlice";
import { useGetValues } from "../../../hooks/useGetValues";
import type { ICartProduct } from "../../../types";
import { RiCoupon4Line } from "react-icons/ri";
import axios from "axios";

interface ICheckoutForm {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  cardNumber: string;
  expDate: string;
  cvc: string;
  payment: "card" | "paypal";
}

const BOT_TOKEN = "7716182247:AAFA9IQydhq-D8EV0wzTvLmbAG-hCwpLM9I";
const CHAT_ID = "-1002931166593";

const Checkout = () => {
  const cart: ICartProduct[] = useSelector(
    (state: { cart: { value: ICartProduct[] } }) => state.cart.value
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation() as { state?: { selected?: string } };
  const selected = state?.selected || "free";

  const { formData, handleChange } = useGetValues<ICheckoutForm>({
    firstName: "John",
    lastName: "Doe",
    phone: "+998901234567",
    email: "john.doe@email.com",
    address: "123 Example Street",
    country: "uz",
    city: "Tashkent",
    state: "Yunusobod",
    zip: "100011",
    cardNumber: "4111 1111 1111 1111",
    expDate: "12/26",
    cvc: "123",
    payment: "card",
  });

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const discount = 25;
  const total = useMemo(() => {
    let result = subtotal - discount;
    if (selected === "express") return result + 15;
    if (selected === "pickup") return result * 1.21;
    return result;
  }, [subtotal, selected]);

  const handlePlaceOrder = async () => {
    let text = `🛒 Yangi Buyurtma!\n\n👤 Mijoz: ${formData.firstName} ${formData.lastName}\n📞 Tel: ${formData.phone}\n✉️ Email: ${formData.email}\n🏠 Manzil: ${formData.address}, ${formData.city}, ${formData.state}, ${formData.country}\n\n📦 Buyurtmalar:\n`;

    cart.forEach((item, idx) => {
      text += `${idx + 1}) ${item.title} | ${item.quantity} x $${
        item.price
      } = $${item.price * item.quantity}\n`;
    });

    text += `\n💵 Subtotal: $${subtotal}\n🎟️ Chegirma: -$${discount}\n🚚 Yetkazib berish: ${
      selected === "free" ? "Bepul" : "$15"
    }\n✅ Umumiy: $${total}`;

    try {
      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML",
      });

      console.log("✅ Telegramga yuborildi!");
      const checkoutData = {
        total,
        payment: formData.payment,
      };

      localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

      navigate("/cart/completed", { state: checkoutData });
    } catch (error) {
      console.error("❌ Telegram xatolik:", error);
    }
  };

  return (
    <div className="container py-20 flex justify-between gap-8">
      <form
        className="w-[643px] flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          handlePlaceOrder();
        }}
      >
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="font-medium text-[20px]">Contact Information</h3>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Phone Number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+998..."
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email Address</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-lg">Shipping Address</h3>
          <div>
            <label className="block text-sm mb-1">Street Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter street address"
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            >
              <option value="uz">Uzbekistan</option>
              <option value="us">United States</option>
              <option value="de">Germany</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm mb-1">Town / City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">State</label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Zip Code</label>
              <input
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="100011"
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-lg">Payment Method</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={formData.payment === "card"}
                onChange={handleChange}
              />
              Pay by Card Credit
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={formData.payment === "paypal"}
                onChange={handleChange}
              />
              Paypal
            </label>
          </div>
          <div>
            <label className="block text-sm mb-1">Card Number</label>
            <input
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="4111 1111 1111 1111"
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">Expiration Date</label>
              <input
                name="expDate"
                value={formData.expDate}
                onChange={handleChange}
                placeholder="MM/YY"
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">CVC</label>
              <input
                name="cvc"
                value={formData.cvc}
                onChange={handleChange}
                placeholder="123"
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Place Order
        </button>
      </form>

      <div className="border rounded-lg px-6 py-4 w-[413px] ">
        <h3 className="font-medium text-3xl text-[#121212] mb-4">
          Order summary
        </h3>

        <div className="space-y-6 max-h-[456px] overflow-y-auto p-">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b border-b-[#E8ECEF]  py-6"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-14 h-14 rounded object-cover"
                />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => dispatch(decreaseAmount(item))}
                      className="px-2 border rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => dispatch(increaseAmount(item))}
                      className="px-2 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p>${item.price * item.quantity}</p>
                <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(item))}
                  className="text-red-500 text-xs mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 items-center mb-4">
          <input
            type="text"
            placeholder="Discount code"
            className="flex-1 border border-[#CBCBCB] rounded-md p-3"
          />
          <button className="bg-black text-white px-5 py-3 rounded-md">
            Apply
          </button>
        </div>

        <div className="mt-6 p-6 bg-white rounded-2xl shadow-sm border border-[#E8ECEF] space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <RiCoupon4Line className="text-[#6C7275]" size={20} />
              <span className="text-[#141718] text-[16px] font-medium">
                Discount
              </span>
            </div>
            <span className="text-[#38CB89] font-semibold text-[16px] cursor-pointer hover:underline">
              - ${discount}{" "}
              <span className="text-sm text-[#6C7275] ml-1">[Remove]</span>
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-[#E8ECEF] pb-3">
            <span className="text-[#6C7275] text-[15px]">Shipping</span>
            <span className="text-[#141718] font-semibold text-[15px]">
              {selected === "free" ? "Free" : "$15.00"}
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-[#E8ECEF] pb-3">
            <span className="text-[#6C7275] text-[15px]">Subtotal</span>
            <span className="text-[#141718] font-medium text-[15px]">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center pt-3">
            <span className="text-[18px] font-semibold text-[#141718]">
              Total
            </span>
            <span className="text-[20px] font-bold text-[#141718]">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Checkout);
