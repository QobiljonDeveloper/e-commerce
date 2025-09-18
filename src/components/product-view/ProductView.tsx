import { memo } from "react";
import Title from "../title";
import { useFetch } from "../../hooks/useFetch";
import ProductGrid from "../Product-grid";

const ProductView = () => {
  const { data, error, loading } = useFetch("/products", { limit: 4 });

  return (
    <div className="container w-full py-12 px-8">
      <div className="mb-12">
        <Title text="New Arrivals" link="products" />
      </div>
      <ProductGrid
        data={data?.products || []}
        error={error}
        loading={loading}
        limit={4}
      />
    </div>
  );
};

export default memo(ProductView);
