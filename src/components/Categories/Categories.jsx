import React, { useContext, useEffect, useState } from 'react'
import styles from './Categories.module.css'
import { categoryContext } from '../../Context/categoryContext'
import Loader from '../Shared/loader/loader'
import { DotLoader, FadeLoader, SyncLoader } from 'react-spinners'
import { Helmet } from 'react-helmet'
export default function Categories() {
  const {categories} = useContext(categoryContext)
    const[count,setCount] = useState(0)
  return (
    <>
    <Helmet>
        <title>Categories</title>
      </Helmet>
     <div className='headerTitle flex flex-col justify-center items-center bg-[#0aad0a] md:mt-8 mt-5 md:p-1 rounded-md text-center'>
          <h1 className='text-white font-bold text-xl p-3'> Categories</h1>
          
    
        </div>
        {categories.length==0 && <div className='flex justify-center mt-24 mb-10'><FadeLoader /></div>}
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-14 mt-3 p-10 '>
        {categories.map(category=>(
           <div className=' bg-white shadow-2xl text-center rounded-3xl pb-5'>
          <img className='w-full h-[270px] pb-5 rounded-3xl' src={category.image}/>
          <span className='font-bold pt-3 text-[#0aad0a] '>{category.name}</span>
          
        </div>
        ))}
        
        </div>
        </>
  )
}
