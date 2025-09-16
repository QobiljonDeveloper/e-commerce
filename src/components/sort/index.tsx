import { memo, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import sort1 from "../../assets/sort/bi_grid-3x3-gap-fill.png";
import sort2 from "../../assets/sort/fluent_grid-24-filled.png";
import sort3 from "../../assets/sort/Vector2.png";
import sort4 from "../../assets/sort/Vector.png";

const Sort = () => {
  const [activeGrid, setActiveGrid] = useState<number | null>(0);
  const [isOpen, setIsOpen] = useState(false);

  const gridIcons = [sort1, sort2, sort3, sort4];

  return (
    <div className="w-[296px] h-10 flex justify-between items-center ">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 cursor-pointer select-none"
      >
        <p className="text-sm font-medium">Sort by</p>
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>

      <div className="flex">
        {gridIcons.map((icon, i) => (
          <button
            key={i}
            onClick={() => setActiveGrid(i)}
            className={`w-11 h-10 flex items-center justify-center
              ${
                activeGrid === i
                  ? "bg-[#E8ECEF]"
                  : "bg-white border border-[#E8ECEF]"
              }`}
          >
            <img
              src={icon}
              alt={`grid-${i}`}
              className={`w-6 h-6 ${
                activeGrid === i ? "filter-none" : "brightness-0 invert-[77%]"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default memo(Sort);
