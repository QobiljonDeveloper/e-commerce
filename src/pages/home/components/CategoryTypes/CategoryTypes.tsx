import { memo } from "react";
import chair from "../../../../assets/chair.png";
import furniture from "../../../../assets/furniture.png";
import toaster from "../../../../assets/toaster.png";
import { Link } from "react-router-dom";

const CategoryTypes = () => {
  return (
    <section className="container mx-auto py-10 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="row-span-2 relative rounded-lg overflow-hidden">
          <img
            src={chair}
            alt="Living Room"
            className="w-full h-auto object-cover"
          />
          <div className="absolute top-0 left-0  p-12 w-[70%]">
            <h2 className="font-semibold text-3xl text-sy leading-snug">
              Living Room
            </h2>
            <Link
              to={"/"}
              className="relative inline-block text-sy mt-2 font-medium cursor-pointer 
        after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] 
        after:bg-sy after:w-0 after:transition-all after:duration-500 hover:after:w-full"
            >
              Shop Now →
            </Link>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden">
          <img
            src={furniture}
            alt="Bedroom"
            className="w-full h-auto object-cover"
          />
          <div className="absolute bottom-0 left-0  p-12 w-[70%]">
            <h2 className="font-semibold text-2xl text-sy ">Bedroom</h2>
            <Link
              to={"/"}
              className="relative inline-block text-sy mt-2 font-medium cursor-pointer 
        after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] 
        after:bg-sy after:w-0 after:transition-all after:duration-500 hover:after:w-full"
            >
              Shop Now →
            </Link>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden">
          <img
            src={toaster}
            alt="Kitchen"
            className="w-full h-auto object-cover"
          />
          <div className="absolute bottom-0 left-0 p-12 w-[70%]">
            <h2 className="font-semibold text-2xl text-sy leading-snug">
              Kitchen
            </h2>
            <Link
              to={"/"}
              className="relative inline-block text-sy mt-2 font-medium cursor-pointer 
        after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] 
        after:bg-sy after:w-0 after:transition-all after:duration-500 hover:after:w-full"
            >
              Shop Now →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(CategoryTypes);
