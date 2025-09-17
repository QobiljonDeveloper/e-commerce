import { memo, useEffect, useState } from "react";
import { api } from "../../../../api";
import { removeToken } from "../../../../lib/features/authSlice";
import { useDispatch } from "react-redux";
import type { IUser } from "../../../../types";

const AccountSub = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="w-full p-6 md:p-8  animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm w-full">
          <div className="w-full">
            <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
            <div className="h-5 w-40 bg-gray-300 rounded"></div>
          </div>
          <div className="w-full">
            <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
            <div className="h-5 w-32 bg-gray-300 rounded"></div>
          </div>
          <div className="w-full">
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-5 w-28 bg-gray-300 rounded"></div>
          </div>
          <div className="w-full">
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-5 w-36 bg-gray-300 rounded"></div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
          <div className="h-5 w-full bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {data && (
        <div className="w-full p-6 md:p-8 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm w-full">
            <div className="w-full">
              <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                Email
              </p>
              <p className="font-medium text-gray-800 break-all">
                {data.email}
              </p>
            </div>
            <div className="w-full">
              <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                Phone
              </p>
              <p className="font-medium text-gray-800">{data.phone}</p>
            </div>
            <div className="w-full">
              <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                Birth Date
              </p>
              <p className="font-medium text-gray-800">{data.birthDate}</p>
            </div>
            <div className="w-full">
              <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                Company
              </p>
              <p className="font-medium text-gray-800">
                {data.company.title} – {data.company.name}
              </p>
            </div>
          </div>

          <div className="mt-6 w-full">
            <p className="text-xs font-medium text-gray-500 uppercase mb-1">
              Address
            </p>
            <p className="font-medium text-gray-800 leading-relaxed">
              {data.address.address}, {data.address.city}, {data.address.state}{" "}
              {data.address.postalCode}, {data.address.country}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(AccountSub);
