import { memo, Suspense } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Title from "../title";
import ProductGrid from "../Product-grid";
import wishlistempty from "../../assets/wishlistempty.webp";

const WishlistPreview = () => {
  const wishlist = useSelector((state: any) => state.wishlist.value);

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="container flex flex-col justify-center items-center py-20">
        <Suspense fallback={<p>Loading...</p>}>
          <img
            src={wishlistempty as unknown as string}
            alt="Empty wishlist"
            className="max-h-[400px] object-contain"
          />
        </Suspense>

        <p className="mt-6 text-lg text-gray-600">Your wishlist is empty</p>

        <Link
          to="/shop"
          className="max-w-[300px] w-full mt-6 bg-black text-white text-center py-3 px-2 rounded-lg hover:bg-gray-800 transition"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container w-full py-12 px-8">
      <div className="mb-12">
        <Title text="My Wishlist" link="wishlist" />
      </div>
      <ProductGrid data={wishlist} error={null} loading={false} limit={4} />
    </div>
  );
};

export default memo(WishlistPreview);
