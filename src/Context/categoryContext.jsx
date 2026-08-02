import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const categoryContext = createContext()
export default function CategoryContextProvider({children}) {
    let[categories,setCategories] = useState([])
    async function getAllCategorires() {
     let {data} =  await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
     setCategories(data.data)
     console.log(data);
     

        
    }
    useEffect(()=>{
        getAllCategorires()

    },[])

  return (
    <categoryContext.Provider value={{categories,getAllCategorires}}>{children}</categoryContext.Provider>
  )
}
