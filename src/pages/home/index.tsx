import { memo } from 'react';
import { useFetch } from '../../hooks/useFetch';
import ProductView from '../../components/product-view/ProductView';
import JoinUs from './components/JoinUs';

const Home = () => {
  const {data} = useFetch("/products", {limit: 4})
  
  return (
    <div className="">      
      <h2>Home</h2>
      <ProductView data={data?.products} />  
      <JoinUs />
    </div>
  );
};

export default memo(Home);