
import { memo } from "react";

import ProductView from "../../components/product-view/ProductView";
import ArticlesView from "../../components/articles-view";

import { useFetch } from '../../hooks/useFetch';
import ProductView from '../../components/product-view/ProductView';

import MySwiper from "./components/MySwiper/MySwiper";
import SimplyBetter from "./components/SimplyBetter/SimplyBetter";
import CategoryTypes from "./components/CategoryTypes/CategoryTypes";
import Services from "./components/Services/Services";

import JoinUs from './components/JoinUs';


const Home = () => {

  return (
    <div className="">      
      <h2>Home</h2>

      <ProductView />
      <ArticlesView />

      <ProductView data={data?.products} />  


  return (
    <div className="">      
      <h2>Home</h2>
      <MySwiper />
      <SimplyBetter />
      <CategoryTypes />
{/* Comment */}
      <Services />

      <JoinUs />

    </div>
  );
};

export default memo(Home);
