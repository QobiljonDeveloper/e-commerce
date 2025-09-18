import { memo, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const steps = [
  { path: "/cart/add", label: "Cart" },
  { path: "/cart/checkout", label: "Check Out" },
  { path: "/cart/completed", label: "Complete!" },
];

const Cart = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="Cart pb-20">
      <h2 className="text-center my-6 text-[54px] font-[500] leading-[58px] tracking-[-1px] font-poppins">
        {steps.find((s) => location.pathname.startsWith(s.path))?.label}
      </h2>

      <div className="flex justify-center items-center mb-10">
        {steps.map((step, i) => {
          const currentIndex = steps.findIndex((s) =>
            location.pathname.startsWith(s.path)
          );

          const isCompleted = i < currentIndex;
          const isActive = i === currentIndex; 
          // const isUpcoming = i > currentIndex; 

          return (
            <div
              key={step.path}
              className="flex gap-4 items-center justify-center w-[256px] pb-4"
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2`}
                style={{
                  backgroundColor: isCompleted
                    ? "#22c55e"
                    : isActive
                    ? "#000"
                    : "#d1d5db",
                  borderColor: isCompleted
                    ? "#22c55e"
                    : isActive
                    ? "#000"
                    : "#d1d5db",
                  color: isCompleted || isActive ? "#fff" : "#374151",
                }}
              >
                {isCompleted ? "✓" : i + 1}
              </div>

              <span
                className="mt-2 font-inter font-semibold text-[16px] leading-[26px]"
                style={{
                  color: isCompleted
                    ? "#22c55e"
                    : isActive
                    ? "#000"
                    : "#9ca3af",
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default memo(Cart);
