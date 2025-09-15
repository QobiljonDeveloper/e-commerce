import { memo } from "react";

const SimplyBetter = () => {
  return (
    <section className="">
      <div className="container box-content mt-8 ">
        <div className="flex flex-col lg:flex-row justify-between  lg:items-center gap-4 ">
          <div className="flex flex-col w-full lg:w-[70%]">
            <h3 className="font-medium text-3xl sm:text-2xl md:text-5xl lg:text-[64px] xl:text-[72px] leading-tight text-sy ">
              Simply Unique
              <span className="text-text-sy">/</span>
            </h3>
            <h3 className="font-medium text-2xl sm:text-4xl md:text-5xl lg:text-[64px] xl:text-[72px] text-sy mt-2">
              Simply Better
              <span className="text-text-sy">.</span>
            </h3>
          </div>

          <p className="text-sm sm:text-base md:text-lg font-normal text-text-sy max-w-xl mt-4 lg:mt-0 lg:w-1/2">
            <span className="text-sy font-semibold">3legant</span> is a gift &
            decorations store based in HCMC, Vietnam. Est since 2019.
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(SimplyBetter);
