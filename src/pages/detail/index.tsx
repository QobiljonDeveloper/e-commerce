
import React, { useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import ProductImages from "../../components/productDetail/ProductImages";
import ProductInfo from "../../components/productDetail/ProductInfo";


const Detail: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto py-10">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProductImages />
        <ProductInfo />
      </div>

      <div className="mt-12">
        <div className="flex gap-8 border-b">
          <NavLink
            end
            to=""
            className={({ isActive }) =>
              `pb-3 font-medium transition-colors ${
                isActive
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`
            }
          >
            Additional Information
          </NavLink>
          <NavLink
            to="questions"
            className={({ isActive }) =>
              `pb-3 font-medium transition-colors ${
                isActive
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`
            }
          >
            Questions
          </NavLink>
          <NavLink
            to="reviews"
            className={({ isActive }) =>
              `pb-3 font-medium transition-colors ${
                isActive
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`
            }
          >
            Reviews
          </NavLink>
        </div>

        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Detail;
