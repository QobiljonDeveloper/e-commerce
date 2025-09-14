import { memo } from "react";
import ProductView from "../../components/product-view/ProductView";
import ArticlesView from "../../components/articles-view";

const Home = () => {
  return (
    <div className="container">
      <h2>Home</h2>
      <ProductView />
      <ArticlesView />
    </div>
  );
};

export default memo(Home);
