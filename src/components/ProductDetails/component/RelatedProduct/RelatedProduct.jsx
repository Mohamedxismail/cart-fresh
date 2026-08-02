import React, { useEffect, useState } from 'react'
import styles from './RelatedProduct.module.css'
import axios from 'axios'
import ProductItems from '../../../Shared/ProductItems/ProductItems'
export default function RelatedProduct(props) {
    const[count,setCount] = useState(0)
    const[related,setRelated]=useState([])
    let[loading,setLoading]=useState(false)
    let{categoryId}=props
     function getProducts() {
        axios.get('https://ecommerce.routemisr.com/api/v1/products')
          .then(({ data }) => {
           
          let res =   data.data.filter(product => product.category._id == categoryId)
          setRelated(res)
    
          })
          .catch(err => {
            console.log(err);
    
          })
    
      }
    
      useEffect(() => {
        getProducts()
    
      }, [])
  return (
    <div className='flex flex-wrap gap-y-3 mb-8 mt-7'>
          {related.map(product => <ProductItems  key={product.id} product={product}/> )}
          
    
        </div>
  )
}
