import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../../../api";
import { removeToken } from "../../../../lib/features/authSlice";
import type { IUser } from "../../../../types";

const Address = () => {
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

  return (
    <div className="w-full p-6 md:p-8 ">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Address Info</h2>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      ) : data ? (
        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase mb-1">
              Full Address
            </p>
            <p className="font-medium text-gray-800 leading-relaxed">
              {data.address.address}, {data.address.city}, {data.address.state}{" "}
              {data.address.postalCode}, {data.address.country}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                City
              </p>
              <p className="font-medium">{data.address.city}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                State
              </p>
              <p className="font-medium">{data.address.state}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                Postal Code
              </p>
              <p className="font-medium">{data.address.postalCode}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase mb-1">
              Country
            </p>
            <p className="font-medium">{data.address.country}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase mb-1">
              Coordinates
            </p>
            <p className="font-medium text-gray-800">
              Lat: {data.address.coordinates.lat}, Lng:{" "}
              {data.address.coordinates.lng}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No address info available</p>
      )}
    </div>
  );
};

export default memo(Address);
