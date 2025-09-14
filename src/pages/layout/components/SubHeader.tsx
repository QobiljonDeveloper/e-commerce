import { NavLink } from "react-router-dom";
import ticket from "../../../assets/ticket.svg";

const SubHeader = () => {
  return (
    <section className="bg-[#F3F5F7] w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-2 sm:gap-4 h-auto sm:h-[40px] text-sm md:text-base py-2 sm:py-0">
          <img src={ticket} className="size-[20px] md:size-[24px]" />
          <p>30% off storewide — Limited time!</p>
          <NavLink
            to="/shop"
            className="flex items-center gap-1 text-[#377DFF] hover:underline"
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
      </div>
    </section>
  );
};

export default SubHeader;
