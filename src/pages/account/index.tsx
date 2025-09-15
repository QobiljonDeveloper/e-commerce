import { memo, useEffect, useState } from "react";
import { api } from "../../api";
import { useDispatch } from "react-redux";
import { removeToken } from "../../lib/features/authSlice";
import type { IUser } from "../../types";
import profile_photo from "../../assets/profile-photo.svg";
import ClipLoader from "react-spinners/ClipLoader";
const Account = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("Account");

  useEffect(() => {
    setLoading(true);
    api
      .get("/auth/me")
      .then((res) => setData(res.data))
      .catch(() => {
        dispatch(removeToken());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const menuItems = [
    { label: "Account" },
    { label: "Address" },
    { label: "Orders" },
    { label: "Wishlist" },
    { label: "Log Out", action: () => dispatch(removeToken()) },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <ClipLoader />
      </div>
    );
  }

  return (
    <div className="container py-10 md:py-20">
      <p className="text-[32px] md:text-[54px] text-center font-medium mb-10 md:mb-20">
        My Account
      </p>

      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="bg-py py-8 px-4 rounded-lg lg:col-span-1">
            <div className="flex flex-col gap-3 items-center">
              <div className="relative size-20 rounded-full">
                <img
                  src={data.image}
                  alt={data.firstName}
                  className="rounded-full size-20 object-cover"
                />
                <span className="absolute -bottom-1 -right-2 bg-black outline-2 outline-white size-8 rounded-full flex items-center justify-center">
                  <img src={profile_photo} alt="" />
                </span>
              </div>

              <p className="text-[18px] md:text-[20px] font-medium text-center">
                {data.firstName} {data.lastName}
              </p>
            </div>

            <div className="hidden md:flex flex-col gap-5 mt-10 text-left">
              {menuItems.map((item, idx) => (
                <p
                  key={idx}
                  className={`text-[16px] cursor-pointer ${
                    selected === item.label
                      ? "font-semibold border-b pb-2"
                      : "font-medium text-[#6C7275]"
                  }`}
                  onClick={() => {
                    setSelected(item.label);
                    if (item.action) item.action();
                  }}
                >
                  {item.label}
                </p>
              ))}
            </div>

            <div className="mt-8 md:hidden">
              <select
                value={selected}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelected(value);
                  if (value === "Log Out") {
                    dispatch(removeToken());
                  }
                }}
                className="w-full p-2 rounded-md border border-gray-300"
              >
                {menuItems.map((item, idx) => (
                  <option key={idx} value={item.label}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="lg:col-span-3 p-4 md:p-8 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-gray-400">Email</p>
                <p className="font-medium">{data.email}</p>
              </div>
              <div>
                <p className="text-gray-400">Phone</p>
                <p className="font-medium">{data.phone}</p>
              </div>
              <div>
                <p className="text-gray-400">Birth Date</p>
                <p className="font-medium">{data.birthDate}</p>
              </div>
              <div>
                <p className="text-gray-400">Company</p>
                <p className="font-medium">
                  {data.company.title} – {data.company.name}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-gray-400 text-sm">Address</p>
              <p className="font-medium">
                {data.address.address}, {data.address.city},{" "}
                {data.address.state} {data.address.postalCode},{" "}
                {data.address.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Account);
