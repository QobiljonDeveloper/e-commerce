import { memo } from "react";

import ProductView from "../../components/product-view/ProductView";
import ArticlesView from "../../components/articles-view";
import MySwiper from "./components/MySwiper/MySwiper";
import SimplyBetter from "./components/SimplyBetter/SimplyBetter";
import CategoryTypes from "./components/CategoryTypes/CategoryTypes";
import Services from "./components/Services/Services";
import JoinUs from "./components/JoinUs";

const Home = () => {

  return (
    <div className="">
      <MySwiper />
      <SimplyBetter />
      <CategoryTypes />
      <ProductView/>
      <ArticlesView />
      <Services />
      <JoinUs />
    </div>
  );
};

export default memo(Home);
