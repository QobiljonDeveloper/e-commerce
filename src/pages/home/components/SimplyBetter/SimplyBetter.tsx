import { memo } from "react";

const SimplyBetter = () => {
  return (
    <section className="">
      <div className="container">
        <div className="flex  justify-between items-center">
          <h3 className="font-medium text-[72px] text-sy">
            Simply Unique<span className="text-text-sy">/</span> Simply Better
            <span className="text-text-sy">.</span>
          </h3>
          <p className="text-[16px] font-normal text-text-sy">
            <span className="text-sy font-semibold">3legant</span> is a gift & decorations store based in HCMC,
            Vietnam. Est since 2019.{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(SimplyBetter);
