
import { memo } from "react";
import { useFetch } from "../../hooks/useFetch";
import ProductView from "../../components/product-view/ProductView";
import MySwiper from "./components/MySwiper/MySwiper";
import SimplyBetter from "./components/SimplyBetter/SimplyBetter";
import CategoryTypes from "./components/CategoryTypes/CategoryTypes";
import Services from "./components/Services/Services";
import ProductView from '../../components/product-view/ProductView';
import JoinUs from './components/JoinUs';

const Home = () => {
  const { data } = useFetch("/products", { limit: 4 });

  return (
    <div className="">      
      <h2>Home</h2>
      <MySwiper />
      <SimplyBetter />
      <CategoryTypes />

      <ProductView data={data?.products} />
      <Services />
      <ProductView data={data?.products} />  
      <JoinUs />
    </div>
  );
};

export default memo(Home);
