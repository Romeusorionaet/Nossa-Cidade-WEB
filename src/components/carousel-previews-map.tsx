"use client";

import { useWidthScreen } from "@/hooks/use-width-screen";
import Image from "next/image";
import { useRef } from "react";
import type { Swiper as SwiperCore } from "swiper";
import { Autoplay } from "swiper/modules";
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
        className="swiper-button-prev absolute top-1/2 left-0 z-10 -translate-y-1/2 p-2 text-white duration-300 hover:bg-black"
      >
        ◀
      </button>
      <button
        type="button"
        onClick={() => swiperRef.current?.slideNext()}
        className="swiper-button-next absolute top-1/2 right-0 z-10 -translate-y-1/2 p-2 text-white duration-300 hover:bg-black"
      >
        ▶
      </button>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        slidesPerView={getSlidesPerView()}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        <SwiperSlide className="wrapper-preview hover:scale-105 hover:duration-500">
          <div className="h-80">
            <Image
              src="/imgs/previews/supermarket.png"
              alt=""
              width={1000}
              height={1000}
              className="h-full w-full rounded-md object-contain"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="wrapper-preview hover:scale-105 hover:duration-500">
          <div className="h-80">
            <Image
              src="/imgs/previews/butcher-shop.png"
              alt=""
              width={1000}
              height={1000}
              className="h-full w-full rounded-md object-contain"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="wrapper-preview hover:scale-105 hover:duration-500">
          <div className="h-80">
            <Image
              src="/imgs/previews/bakery.png"
              alt=""
              width={1000}
              height={1000}
              className="h-full w-full rounded-md object-contain"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="wrapper-preview hover:scale-105 hover:duration-500">
          <div className="h-80">
            <Image
              src="/imgs/previews/clinic.png"
              alt=""
              width={1000}
              height={1000}
              className="h-full w-full rounded-md object-contain"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="wrapper-preview hover:scale-105 hover:duration-500">
          <div className="h-80">
            <Image
              src="/imgs/previews/beauty-salon.png"
              alt=""
              width={1000}
              height={1000}
              className="h-full w-full rounded-md object-contain"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
