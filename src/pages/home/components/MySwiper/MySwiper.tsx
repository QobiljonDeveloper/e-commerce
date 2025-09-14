import { memo } from "react";
import { Keyboard, Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import mySwiper from "../../../../assets/mySwiper.png";

const MySwiper = () => {
  return (
    <div className="relative w-full px-8">
      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        keyboard={{ enabled: true }}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          821: {
            slidesPerView: 3,
            spaceBetween: 28,
            navigation: {
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            },
            autoplay: false,
          },
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1280: { slidesPerView: 1, spaceBetween: 32 },
        }}
        modules={[Keyboard, Pagination, Navigation, Autoplay]}
        className="mySwiper select-none"
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <SwiperSlide key={num} className="select-none">
            <img
              src={mySwiper}
              alt={`slide-${num}`}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-pagination absolute -bottom-8 left-1/2 -translate-x-1/2 flex justify-center gap-3 z-20"></div>

      <button
        className="custom-prev absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20
             hidden md:flex bg-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
             items-center justify-center rounded-full cursor-pointer shadow-md
             hover:bg-gray-100 transition"
      >
        <GrLinkPrevious className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </button>

      <button
        className="custom-next absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20
             hidden md:flex bg-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
             items-center justify-center rounded-full cursor-pointer shadow-md
             hover:bg-gray-100 transition"
      >
        <GrLinkNext className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </button>
    </div>
  );
};

export default memo(MySwiper);
