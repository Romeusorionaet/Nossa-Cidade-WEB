'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Image from 'next/image'
import { Swiper as SwiperCore } from 'swiper'
import { useWidthScreen } from '@/hooks/use-width-screen'
import '@/assets/styles/components/carousel-previews-map.css'
import { useRef } from 'react'

export function CarouselPreviewsMap() {
  const { widthScreen } = useWidthScreen()
  const swiperRef = useRef<SwiperCore | null>(null)

  const getSlidesPerView = () => {
    if (!widthScreen) return 1.2
    if (widthScreen > 768) return 2.5
    if (widthScreen <= 768 && widthScreen > 568) return 2
    if (widthScreen <= 568) return 1.2
    return 1.2
  }

  return (
    <div className="relative">
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="swiper-button-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-black/50 p-2 text-white duration-300 hover:bg-black"
      >
        ◀
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="swiper-button-next absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-black/50 p-2 text-white duration-300 hover:bg-black"
      >
        ▶
      </button>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        loop
        slidesPerView={getSlidesPerView()}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide className="wrapper-preview">
          <div className="image-measurement">
            <Image
              src="/imgs/previews/map.png"
              alt=""
              width={1000}
              height={1000}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="wrapper-preview">
          <div className="image-measurement">
            <Image
              src="/imgs/previews/map.png"
              alt=""
              width={1000}
              height={1000}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="wrapper-preview">
          <div className="image-measurement">
            <Image
              src="/imgs/previews/map.png"
              alt=""
              width={1000}
              height={1000}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="wrapper-preview">
          <div className="image-measurement">
            <Image
              src="/imgs/previews/map.png"
              alt=""
              width={1000}
              height={1000}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
