import { memo, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import ProductGrid from "../Product-grid";
import Sort from "../sort";

const ShopView = () => {
  const [limit, setLimit] = useState(12);

  const { data, error, loading } = useFetch("/products", { limit });

  return (
    <div className="container w-full py-12 flex flex-col gap-10">
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
          <div className="flex flex-col gap-2 w-full sm:w-[262px]">
            <p className="font-semibold text-sm text-[#6C7275]">CATEGORIES</p>
            <select className="h-12 border-2 rounded-lg border-[#6C7275] px-4 text-sm">
              <option value="Living Room">Living Room</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Kitchen">Kitchen</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full sm:w-[262px]">
            <p className="font-semibold text-sm text-[#6C7275]">PRICE</p>
            <select className="h-12 border-2 rounded-lg border-[#6C7275] px-4 text-sm">
              <option value="All">All Price</option>
              <option value="0-100">$0 – $100</option>
              <option value="100-500">$100 – $500</option>
              <option value="500-1000">$500 – $1000</option>
            </select>
          </div>
        </div>

        <Sort />
      </div>

      <ProductGrid
        data={data?.products || []}
        error={error}
        loading={loading}
        limit={12}
      />

      <div className="flex justify-center">
        {data?.total > limit && (
          <button
            onClick={() => setLimit(limit + 4)}
            className="border border-[#141718] px-10 py-2 rounded-full text-base font-medium hover:bg-[#141718] hover:text-white transition"
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(ShopView);
