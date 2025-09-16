import { memo } from "react";
import { useFetch } from "../../hooks/useFetch";
import ProductView from "../../components/product-view/ProductView";
import { Atom } from "react-loading-indicators";

const Shop = () => {
  const { data, loading, error } = useFetch("/products", { limit: 12 });
  if (loading)
    return (
      <div className="flex items-center justify-center h-433">
        <Atom color="#111" size="large" text="" textColor="" />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-semibold text-red-600 bg-red-100 px-6 py-3 rounded-lg">
          Error: {error instanceof Error ? error.message : String(error)}
        </p>
      </div>
    );
  return (
    <div className="container">
      <h2>Shop</h2>
      {data && (
        <ProductView data={data.products} error={error} loading={loading} />
      )}
    </div>
  );
};

export default memo(Shop);
