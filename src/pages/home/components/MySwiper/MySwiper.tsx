import { memo } from "react";
import { Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import mySwiper from "../../../../assets/mySwiper.png";

const MySwiper = () => {
  return (
    <div className="relative">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{ enabled: true }}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        modules={[Keyboard, Pagination, Navigation]}
        className="mySwiper select-none"
      >
        <SwiperSlide className="select-none">
          <img src={mySwiper} alt="slide-1" />
        </SwiperSlide>
        <SwiperSlide className="select-none">
          <img src={mySwiper} alt="slide-2" />
        </SwiperSlide>
        <SwiperSlide className="select-none">
          <img src={mySwiper} alt="slide-3" />
        </SwiperSlide>
        <SwiperSlide className="select-none">
          <img src={mySwiper} alt="slide-4" />
        </SwiperSlide>
        <SwiperSlide className="select-none">
          <img src={mySwiper} alt="slide-5" />
        </SwiperSlide>
      </Swiper>

      <div className="custom-pagination absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-4 z-20"></div>

      <button
        className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 z-20
                   bg-white size-14 flex items-center justify-center rounded-full
                   cursor-pointer text-sy"
      >
        <GrLinkPrevious size={32} />
      </button>

      <button
        className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-20
                   bg-white size-14 flex items-center justify-center rounded-full
                   cursor-pointer text-sy"
                  
      >
        <GrLinkNext size={32} />
      </button>
    </div>
  );
};

export default memo(MySwiper);
