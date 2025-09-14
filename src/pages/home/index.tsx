import { memo } from "react";
import MySwiper from "./components/MySwiper/MySwiper";
import SimplyBetter from "./components/SimplyBetter/SimplyBetter";
import CategoryTypes from "./components/CategoryTypes/CategoryTypes";
import Services from "./components/Services/Services";
const Home = () => {

  return (
    <div className="container">
      <h2>Home</h2>
      <MySwiper />
      <SimplyBetter />
      <CategoryTypes />
{/* Comment */}
      <Services />
    </div>
  );
};

export default memo(Home);
