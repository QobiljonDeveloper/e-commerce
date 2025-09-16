import { memo, useState } from "react";
import AddCart from "./components/Addcart";
import Checkout from "./components/Checkout";
import Complated from "./components/Complated";

const steps = [
  { id: 1, label: "Cart" },
  { id: 2, label: "Check Out" },
  { id: 3, label: "Complete!" },
];

const Cart = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="Cart">
      <h2
        className="text-center my-6"
        style={{
          fontFamily: "Poppins",
          fontWeight: 500,
          fontSize: "54px",
          lineHeight: "58px",
          letterSpacing: "-1px",
        }}
      >
        {steps[currentStep - 1].label}
      </h2>

      <div className="flex justify-center items-center mb-10">
        {steps.map((step, i) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div key={step.id} className="flex items-center">
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
                {isCompleted ? "✓" : step.id}
              </div>

              <span
                className="ml-2"
                style={{
                  fontFamily: "Inter",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "26px",
                  letterSpacing: "0px",
                  color: isCompleted
                    ? "#22c55e"
                    : isActive
                    ? "#000"
                    : "#9ca3af",
                }}
              >
                {step.label}
              </span>

              {i < steps.length - 1 && (
                <div
                  className="h-[2px] mx-4 flex-1"
                  style={{
                    backgroundColor:
                      step.id < currentStep ? "#22c55e" : "#d1d5db",
                  }}
                ></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        {currentStep === 1 && <AddCart />}
        {currentStep === 2 && <Checkout />}
        {currentStep === 3 && <Complated />}
      </div>

      <div className="flex justify-between mt-10">
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep((s) => s - 1)}
            className="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Back
          </button>
        )}
        {currentStep < steps.length && (
          <button
            onClick={() => setCurrentStep((s) => s + 1)}
            className="px-6 py-2 rounded bg-sy text-white hover:bg-sy/90 ml-auto"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(Cart);
