import React, {useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import RelatedProduct from './component/RelatedProduct/RelatedProduct'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Loader from '../Shared/loader/loader'
import { cartContext } from '../../Context/cartContext'
import { toast } from 'react-toastify'



export default function ProductDetails() {
  const [count, setCount] = useState(0)
  const [details, setDetails] = useState(null)
  let {addToCart} = useContext(cartContext)
  let [loading,setLoading] = useState(false)

  const { id, categoryId } = useParams()
  const navigate = useNavigate();
  function getProductDetails() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        console.log(data);
        setDetails(data.data)
      })
      .catch(err => {
      })

  }
  useEffect(() => {
    getProductDetails()

  }, [id])
  async function addProductToCart(id) {
    if (!localStorage.getItem("userToken")) {
  navigate("/login");
  toast.info("Please login to add products to your cart.");
  return;
}
    setLoading(true)
   let data = await addToCart(id)
   setLoading(false)
    if (data.status == "success") {
              toast.success("product Added successfully");
    
        }
  }
  return (
    <>
<div className="mx-auto container">
  
  
      {details && <div className='md:flex flex-wrap items-center '>

        <div className="md:w-4/12  ">
          <Swiper
            spaceBetween={30}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            speed={800}
            className="mySwiper"
          >
            {details?.images?.map((src, index) => (
              <SwiperSlide key={index}>
                <img src={src} className="w-full" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="md:w-8/12 p-4 ">
          <h1 className='mb-2'>{details?.title}</h1>
          <p className='mb-2 text-cyan-600'>{details?.description}</p>
          <span>{details?.category.name}</span>
          <div className="flex justify-between pt-3">
            <h3>{details?.price} EGP</h3>
            <h4><i className='fa fa-star text-yellow-400'></i>
              {details?.ratingsAverage} </h4>
          </div>
          <button disabled={loading} onClick={()=>addProductToCart(details.id)} className='btn bg-[#0aad0a] text-white w-full mt-3 rounded p-2'>
            {loading ?  <span>loading ... </span> : <span>add to cart</span>} </button>
        </div>

      </div>}
      {!details && <div className='mt-16 pt-16 pb-16 mb-10'><Loader/></div>}
      
      {details && (
  <>
    <h1 className='md:text-3xl text-2xl text-[#0aad0a] text-center bg-white shadow-sm rounded-md p-6'>
      Related Products
    </h1>
    <RelatedProduct categoryId={categoryId} />
  </>
)}
</div>
    </>
  )
}
