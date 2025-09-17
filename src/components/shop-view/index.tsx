import { memo, useEffect, useState, type ChangeEvent } from "react";
import { useFetch } from "../../hooks/useFetch";
import ProductGrid from "../Product-grid";
import { DollarSign, Tag, ArrowUpDown } from "lucide-react";

const ShopView = () => {
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [order, setOrder] = useState("id-asc");
  const [category, setCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [skip, setSkip] = useState(0);
  const limit = 4;

  const { data, error, loading } = useFetch("/products", { limit: 100 });

  useEffect(() => {
    if (data?.products) {
      const uniqueCats = [
        "All",
        ...new Set(data.products.map((p: any) => p.category)),
      ];
      setCategories(uniqueCats as any);
    }
  }, [data]);

  useEffect(() => {
    if (data?.products) {
      let filtered = [...data.products];

      if (category !== "All") {
        filtered = filtered.filter((p) => p.category === category);
      }

      filtered = filtered.filter((p) => {
        const price = p.price;
        const min = minPrice ?? 0;
        const max = maxPrice ?? Infinity;
        return price >= min && price <= max;
      });

      if (order === "price-asc") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (order === "price-desc") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (order === "id-asc") {
        filtered.sort((a, b) => a.id - b.id);
      }
      setProducts(filtered.slice(0, skip + limit));
    }
  }, [data, category, minPrice, maxPrice, order, skip]);

  const handleChangeOrder = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value);
    setSkip(0);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setSkip(0);
  };

  const handleMinPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value ? Number(e.target.value) : undefined);
    setSkip(0);
  };

  const handleMaxPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value ? Number(e.target.value) : undefined);
    setSkip(0);
  };

  const filteredCount =
    data?.products.filter((p: any) => {
      const price = p.price;
      const min = minPrice ?? 0;
      const max = maxPrice ?? Infinity;
      const catOk = category === "All" || p.category === category;
      return price >= min && price <= max && catOk;
    }).length || 0;

  return (
    <div className="container w-full py-12 flex flex-col gap-10">
      <div className="flex gap-4 items-center flex-wrap">
        {/* Min Price */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="number"
            placeholder="Min price"
            onChange={handleMinPrice}
            className="h-12 border-2 rounded-lg border-[#6C7275] pl-9 pr-4 text-sm w-32"
          />
        </div>

        {/* Max Price */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="number"
            placeholder="Max price"
            onChange={handleMaxPrice}
            className="h-12 border-2 rounded-lg border-[#6C7275] pl-9 pr-4 text-sm w-32"
          />
        </div>

        {/* Category */}
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

        {/* Sort */}
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

      <ProductGrid
        data={products}
        error={error}
        loading={loading}
        limit={limit}
      />

      <div className="flex justify-center">
        {products.length < filteredCount && (
          <button
            onClick={() => setSkip((prev) => prev + limit)}
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
