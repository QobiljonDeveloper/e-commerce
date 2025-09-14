
import { memo } from "react";
import ProductView from "../../components/product-view/ProductView";
import ArticlesView from "../../components/articles-view";

import { useFetch } from '../../hooks/useFetch';
import ProductView from '../../components/product-view/ProductView';
import JoinUs from './components/JoinUs';


const Home = () => {
  return (
    <div className="">      
      <h2>Home</h2>

      <ProductView />
      <ArticlesView />

      <ProductView data={data?.products} />  
      <JoinUs />

    </div>
  );
};

export default memo(Home);
