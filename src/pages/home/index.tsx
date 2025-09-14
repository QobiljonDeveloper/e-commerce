
import { memo } from "react";
import MySwiper from "./components/MySwiper/MySwiper";
import SimplyBetter from "./components/SimplyBetter/SimplyBetter";
import CategoryTypes from "./components/CategoryTypes/CategoryTypes";
import Services from "./components/Services/Services";
import JoinUs from './components/JoinUs';

const Home = () => {

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
