import { memo, useEffect, useState, type ChangeEvent } from "react";
import { useFetch } from "../../hooks/useFetch";
import ProductGrid from "../Product-grid";
import { DollarSign, Tag, ArrowUpDown } from "lucide-react";
import type { IProduct } from "../../types";

const ShopView = () => {
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [order, setOrder] = useState("id-asc");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [skip, setSkip] = useState(0);
  const limit = 12;

  const { data, error, loading, refetch } = useFetch("/products");

  useEffect(() => {
    refetch({ limit, skip: 0 });
  }, []);

  useEffect(() => {
    if (data?.products) {
      if (skip === 0) {
        setAllProducts(data.products);
      } else {
        setAllProducts((prev) => [...prev, ...data.products]);
      }

      if (categories.length === 0 && data.products.length > 0) {
        const uniqueCats = [
          "All",
          ...new Set(data.products.map((p: IProduct) => p.category)),
        ];
        setCategories(uniqueCats);
      }
    }
  }, [data]);

  useEffect(() => {
    let temp = [...allProducts];

    if (category !== "All") {
      temp = temp.filter((p) => p.category === category.toLowerCase());
    }

    if (minPrice !== undefined) {
      temp = temp.filter((p) => p.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      temp = temp.filter((p) => p.price <= maxPrice);
    }

    if (order === "price-asc") {
      temp.sort((a, b) => a.price - b.price);
    } else if (order === "price-desc") {
      temp.sort((a, b) => b.price - a.price);
    } else {
      temp.sort((a, b) => a.id - b.id); 
    }

    setFilteredProducts(temp);
  }, [allProducts, category, minPrice, maxPrice, order]);

  const handleShowMore = () => {
    const newSkip = skip + limit;
    setSkip(newSkip);
    refetch({ limit, skip: newSkip });
  };

  return (
    <div className="container w-full py-12 flex flex-col gap-10">
      <div className="flex gap-4 items-center flex-wrap">
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="number"
            placeholder="Min price"
            onChange={(e) =>
              setMinPrice(e.target.value ? Number(e.target.value) : undefined)
            }
            className="h-12 border-2 rounded-lg border-[#6C7275] pl-9 pr-4 text-sm w-32"
          />
        </div>

        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="number"
            placeholder="Max price"
            onChange={(e) =>
              setMaxPrice(e.target.value ? Number(e.target.value) : undefined)
            }
            className="h-12 border-2 rounded-lg border-[#6C7275] pl-9 pr-4 text-sm w-32"
          />
        </div>

        <div className="relative">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <select
            onChange={(e) => setCategory(e.target.value)}
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
            onChange={(e) => setOrder(e.target.value)}
            value={order}
            className="h-12 border-2 rounded-lg border-[#6C7275] pl-9 pr-4 text-sm"
          >
            <option value="id-asc">Ommabop</option>
            <option value="price-asc">Arzon → Qimmat</option>
            <option value="price-desc">Qimmat → Arzon</option>
          </select>
        </div>
      </div>

      <ProductGrid data={filteredProducts} error={error} loading={loading} />

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
