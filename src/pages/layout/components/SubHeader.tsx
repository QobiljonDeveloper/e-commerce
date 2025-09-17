import { NavLink } from "react-router-dom";
import ticket from "../../../assets/ticket.svg";
import { X } from "lucide-react";
import { useState } from "react";

const SubHeader = () => {
  const [show, setShow] = useState(true);
  return (
    <>
      {show && (
        <section className="bg-[#F3F5F7] w-full">
          <div className="px-4">
            <div className="relative flex items-center justify-center h-auto sm:h-[40px] text-sm md:text-base py-2 sm:py-0">
              <div className="flex items-center gap-3 text-center">
                <img src={ticket} className="size-[20px] md:size-[24px]" />
                <p>30% off storewide — Limited time!</p>

                <NavLink
                  to="/shop"
                  className="hidden sm:flex items-center gap-1 text-[#377DFF] hover:underline"
                >
                  <span>Shop Now</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-move-right"
                  >
                    <path d="M18 8L22 12L18 16" />
                    <path d="M2 12H22" />
                  </svg>
                </NavLink>
              </div>

              <X
                className="absolute right-2 cursor-pointer "
                onClick={() => setShow(false)}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SubHeader;
