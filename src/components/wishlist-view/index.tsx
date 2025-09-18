import { memo } from "react";
import { useSelector } from "react-redux";
import Title from "../title";
import ProductGrid from "../Product-grid";

const WishlistPreview = () => {
  const wishlist = useSelector((state: any) => state.wishlist.value);

  return (
    <div className="container w-full py-12 px-8">
      <div className="mb-12">
        <Title text="My Wishlist" link="wishlist" />
      </div>
      <ProductGrid
        data={wishlist}
        error={null}
        loading={false}
        limit={4}
      />
    </div>
  );
};

export default memo(WishlistPreview);
