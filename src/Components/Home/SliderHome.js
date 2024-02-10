import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./SliderHome.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import MediaCard from "../../ReusedCompnents/Card";

export default function SliderHome({ data }) {
  const [indexC, setIndexC] = useState(-3);
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
      >
        {data?.popular_products.map((item) => {
          return (
            <SwiperSlide>
              <MediaCard
                imag={item.base_image.large_image_url}
                price={item.price}
                item_id={item.id}
                setIndexC={setIndexC}
                indexC={indexC}
                name={item.name}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
