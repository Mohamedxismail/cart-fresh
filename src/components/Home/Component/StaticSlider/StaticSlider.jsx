import React, { useEffect, useState } from 'react'
import styles from './StaticSlider.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import slider1 from '../../../../assets/slider-image-1.jpeg'
import slider2 from '../../../../assets/slider-image-2.jpeg'
import slider3 from '../../../../assets/slider-image-3.jpeg'
import static1 from '../../../../assets/grocery-banner.png'
import static2 from '../../../../assets/grocery-banner-2.jpeg'
import static3 from '../../../../assets/slider-2.jpeg'
export default function StaticSlider() {
    const[count,setCount] = useState(0)
  return (
    <div className='lg:flex flex-wrap '>
      <div className="lg:w-4/6 md:w-full">
        <Swiper
        speed={1100}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        
        modules={[Pagination]}
        className="mySwiperr"
      >
        <SwiperSlide><img src={slider2} className='lg:w-full lg:h-[550px]'/></SwiperSlide>
        <SwiperSlide><img src={slider1} className='lg:w-full lg:h-[550px]'/></SwiperSlide>
        <SwiperSlide><img src={slider3} className='lg:w-full lg:h-[550px]'/></SwiperSlide>
        
      {/* <SwiperSlide className='lg:hidden'> 
       <img src={static2} className=' w-full ' alt=""/>
       <img src={static3} className=' w-full' alt=""/>
      </SwiperSlide> */}
        
      </Swiper>
      </div>
      <div className="lg:w-1/3 lg:grid hidden ">
      <img src={static3} className='h-[275px]' alt=""/>
       <img src={static2} className='h-[275px]' alt=""/>
      </div>
     
    </div>
  )
}
