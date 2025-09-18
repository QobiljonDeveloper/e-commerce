import { memo, useEffect, useState, type ChangeEvent } from "react";
import { useFetch } from "../../hooks/useFetch";
import ProductGrid from "../Product-grid";
import { DollarSign, Tag, ArrowUpDown } from "lucide-react";
import type { IProduct } from "../../types";

const ShopView = () => {
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [order, setOrder] = useState("id-asc");
  const [category, setCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [skip, setSkip] = useState(0);
  const limit = 12;

  const { data, error, loading, refetch } = useFetch("/products");
  useEffect(() => {
    refetch({ limit, skip: 0, order, category, minPrice, maxPrice });
  }, []);

  useEffect(() => {
    if (data?.products) {
      if (skip === 0) {
        setProducts(data.products);
      } else {
        setProducts((prev) => [...prev, ...data.products]);
      }

      if (categories.length === 0 && data.products.length > 0) {
        const uniqueCats = [
          "All",
          ...new Set(data.products.map((p: any) => p.category)),
        ];
        setCategories(uniqueCats as string[]);
      }
    }
  }, [data]);

  const handleShowMore = () => {
    const newSkip = skip + limit;
    setSkip(newSkip);
    refetch({ limit, skip: newSkip, order, category, minPrice, maxPrice });
  };

  const resetAndFetch = (updates: Partial<any>) => {
    setSkip(0);
    refetch({
      limit,
      skip: 0,
      order,
      category,
      minPrice,
      maxPrice,
      ...updates,
    });
  };

  const handleChangeOrder = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value);
    resetAndFetch({ order: e.target.value });
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    resetAndFetch({ category: e.target.value });
  };

  const handleMinPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    setMinPrice(value);
    resetAndFetch({ minPrice: value });
  };

  const handleMaxPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    setMaxPrice(value);
    resetAndFetch({ maxPrice: value });
  };

  return (
    <div className="container w-full py-12 flex flex-col gap-10">
      <div className="flex gap-4 items-center flex-wrap">
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="number"
            placeholder="Min price"
            onChange={handleMinPrice}
            className="h-12 border-2 rounded-lg border-[#6C7275] pl-9 pr-4 text-sm w-32"
          />
        </div>

        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="number"
            placeholder="Max price"
            onChange={handleMaxPrice}
            className="h-12 border-2 rounded-lg border-[#6C7275] pl-9 pr-4 text-sm w-32"
          />
        </div>

        <div className="relative">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <select
            onChange={handleCategoryChange}
            value={category}
            className="h-12 border-2 rounded-lg border-[#6C7275] pl-9 pr-4 text-sm"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <select
            onChange={handleChangeOrder}
            value={order}
            className="h-12 border-2 rounded-lg border-[#6C7275] pl-9 pr-4 text-sm"
          >
            <option value="id-asc">Ommabop</option>
            <option value="price-asc">Arzon → Qimmat</option>
            <option value="price-desc">Qimmat → Arzon</option>
          </select>
        </div>
      </div>

      <ProductGrid data={products} error={error} loading={loading} />

      <div className="flex justify-center">
        {data?.products?.length === limit && (
          <button
            onClick={handleShowMore}
            className="border border-[#141718] px-10 py-2 rounded-full text-base font-medium hover:bg-[#141718] hover:text-white transition flex items-center gap-2"
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(ShopView);
