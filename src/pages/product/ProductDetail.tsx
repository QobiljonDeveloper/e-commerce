import React from "react";
import ProductInfo from "../../components/productDetail/ProductInfo";
import ProductReviews from "../../components/productDetail/ProductReview";
import ProductImages from "../../components/productDetail/ProductImages";

const ProductDetail: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <ProductImages />
          <ProductInfo />
        </div>

        <div className="mt-16">
          <ProductReviews />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
