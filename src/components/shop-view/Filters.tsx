import { memo, type ChangeEvent } from "react";

type FiltersProps = {
  category: string;
  categories: string[];
  onChangeCategory: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangePrice: (e: ChangeEvent<HTMLSelectElement>) => void;
  order: string;
  onChangeOrder: (value: string) => void;
};

const Filters = ({
  category,
  categories,
  onChangeCategory,
  onChangePrice,
  order,
  onChangeOrder,
}: FiltersProps) => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
      <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
        {/* Category filter */}
        <div className="flex flex-col gap-2 w-full sm:w-[262px]">
          <p className="font-semibold text-sm text-[#6C7275]">CATEGORIES</p>
          <select
            value={category}
            onChange={onChangeCategory}
            className="h-12 border-2 rounded-lg border-[#6C7275] px-4 text-sm"
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price filter */}
        <div className="flex flex-col gap-2 w-full sm:w-[262px]">
          <p className="font-semibold text-sm text-[#6C7275]">PRICE</p>
          <select
            onChange={onChangePrice}
            className="h-12 border-2 rounded-lg border-[#6C7275] px-4 text-sm"
          >
            <option value="All">All Price</option>
            <option value="0-100">$0 – $100</option>
            <option value="100-500">$100 – $500</option>
            <option value="500-1000">$500 – $1000</option>
          </select>
        </div>
      </div>

      {/* Sort */}
      <div className="flex flex-col gap-2 w-full sm:w-[200px]">
        <p className="font-semibold text-sm text-[#6C7275]">SORT</p>
        <select
          value={order}
          onChange={(e) => onChangeOrder(e.target.value)}
          className="h-12 border-2 rounded-lg border-[#6C7275] px-4 text-sm"
        >
          <option value="id-asc">Ommabop</option>
          <option value="price-asc">Arzon → Qimmat</option>
          <option value="price-desc">Qimmat → Arzon</option>
        </select>
      </div>
    </div>
  );
};

export default memo(Filters);
