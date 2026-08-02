import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'




export const brandContext = createContext()
export default function BrandContextProvider({children}) {
    let[brands,setBrands]=useState([])
    async function getBrands() {
      let {data} =  await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      setBrands(data.data)
      console.log(data);
      
        
    }
    useEffect(()=>{
        getBrands()


    },[])
  return (
    <brandContext.Provider value={{getBrands,brands}}>{children}</brandContext.Provider>
  )
}
