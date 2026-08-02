import React, { useEffect, useState } from 'react'
import styles from './ProductItems.module.css'
import { Link } from 'react-router-dom'
export default function ProductItems(props) {
    const[count,setCount] = useState(0)
    let{imageCover,title,category,price,ratingsAverage,id} = props.product
    
    
    
  return (
     <div className="lg:w-1/5 md:w-1/2 px-3 mb-3">
      
        <div className="product group bg-white shadow-lg bord p-2  relative ">
          
          <img src={imageCover} className='mb-2 w-full' alt="" />
          <span className='text-[#0aad0a]'>{category.name}</span>
          <h2 className='font-medium'>{title.split(" ").splice(0,2).join(" ")}</h2>
          <div className="flex justify-between pt-3">
            <h3>{price} EGP</h3>
            <h4><i className='fa fa-star text-yellow-400'></i>
              {ratingsAverage}</h4>
          </div>
          
          <button disabled={props.loading}  onClick={()=>props.addProductToCart(id)} className='btn mb-2 bg-[#0aad0a] w-full  disabled:bg-green-500 text-white  mt-3  rounded-lg p-2  '>
          {props.loading ?  <span>loading ... </span> : <span> 
            + add to cart</span>}   </button>
           <Link to={`/ProductDetails/${id}/${category._id}`}> <button className='btn bg-green-600 bottom-24 mb-3 right-2 absolute    disabled:bg-green-500 text-white  mt-3  rounded-lg p-2  '>view<i className='fa-solid fa-eye ms-1'></i></button></Link>
        </div>
        
      </div>
  )
}
