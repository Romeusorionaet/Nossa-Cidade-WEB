"use client";

import { useWidthScreen } from "@/hooks/use-width-screen";
import Image from "next/image";
import { useRef } from "react";
import type { Swiper as SwiperCore } from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export function CarouselPreviewsMap() {
  const { widthScreen } = useWidthScreen();
  const swiperRef = useRef<SwiperCore | null>(null);

  const getSlidesPerView = () => {
    if (!widthScreen) return 1.2;
    if (widthScreen > 768) return 2.5;
    if (widthScreen <= 768 && widthScreen > 568) return 2;
    if (widthScreen <= 568) return 1.2;
    return 1.2;
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => swiperRef.current?.slidePrev()}
        className="swiper-button-prev absolute top-1/2 left-0 z-10 -translate-y-1/2 bg-black/50 p-2 text-white duration-300 hover:bg-black"
      >
        ◀
      </button>
      <button
        type="button"
        onClick={() => swiperRef.current?.slideNext()}
        className="swiper-button-next absolute top-1/2 right-0 z-10 -translate-y-1/2 bg-black/50 p-2 text-white duration-300 hover:bg-black"
      >
        ▶
      </button>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        loop
        slidesPerView={getSlidesPerView()}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide className="wrapper-preview">
          <div className="h-80">
            <Image
              src="/imgs/previews/map.png"
              alt=""
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="wrapper-preview">
          <div className="h-80">
            <Image
              src="/imgs/previews/map.png"
              alt=""
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="wrapper-preview">
          <div className="h-80">
            <Image
              src="/imgs/previews/map.png"
              alt=""
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="wrapper-preview">
          <div className="h-80">
            <Image
              src="/imgs/previews/map.png"
              alt=""
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
