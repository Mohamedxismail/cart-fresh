import React, { useEffect, useState } from 'react'
import styles from './PopularCategories.module.css'
import axios from 'axios'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
export default function PopularCategories() {
    const[count,setCount] = useState(0)
    const[category,setCategory]=useState([])
   async function getCategories() {
    try {
      let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      console.log(data);
      setCategory(data.data)
      
    } catch (error) {
      console.log("cec");
      
    }
    }
    useEffect(()=>{
      getCategories();

    },[])
  return (
    <>
     <div className="py-20">
      <h2 className='md:text-3xl text-xl mb-5 pb-5  text-center  text-[#0aad0a]  '>Shop popular categories</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        speed={800}
        pagination={{
          clickable: true,
          
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 0,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {category?.map((category, index) => (
                      <SwiperSlide key={index}>
                        <div className="gap-1">
                          <img src={category.image} className="w-full h-[250px] "/>
                          <h4 className='text-center p-1 text-xl'>{category.name}</h4>
                        </div>
                      </SwiperSlide>
                    ))}
      </Swiper>
      </div>
    </>
     
  )
}
