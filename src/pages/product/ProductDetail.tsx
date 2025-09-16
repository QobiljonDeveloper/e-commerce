import React, { useState } from "react";
import ProductInfo from "../../components/productDetail/ProductInfo";
import ProductReviews from "../../components/productDetail/ProductReview";
import ProductImages from "../../components/productDetail/ProductImages";

const ProductDetail: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <ProductImages
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
          />
          <ProductInfo currentImage={currentImage} />
        </div>

        <div className="mt-16">
          <ProductReviews />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

