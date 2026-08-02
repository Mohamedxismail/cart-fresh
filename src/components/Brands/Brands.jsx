import React, { useContext, useEffect, useState } from 'react'
import styles from './Brands.module.css'
import { brandContext } from '../../Context/BrandContext'
import Loader from '../Shared/loader/loader';
import { FadeLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';

export default function Brands() {
  const {brands} = useContext(brandContext)
    const[count,setCount] = useState(0)
  return (
    <>
    <Helmet>
        <title>Brands</title>
      </Helmet>

    <div className='headerTitle flex flex-col justify-center items-center bg-zinc-800 md:mt-6 mt-4 text-center mb-3 p-2'>
      <h1 className='text-white font-bold text-2xl p-3 '>Brand Categories</h1>
      <span className='text-white  pb-3'>Discover our collection of premium brands</span>

    </div>
    {brands.length==0 && <div className='flex justify-center mt-28 mb-10 text-4xl'><FadeLoader /></div>}
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-14 mt-10 '>
    {brands.map(brand=>(
       <div className='p-3 bg-white shadow-md'>
      <img src={brand.image}/>
      <span className='font-bold'>{brand.name}</span>
      
    </div>
    ))}
    
    </div>
    
     
    </>
  )
}
