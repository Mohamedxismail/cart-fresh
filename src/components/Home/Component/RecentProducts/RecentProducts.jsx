import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './RecentProducts.module.css'
import axios from 'axios'
import ProductItems from '../../../Shared/ProductItems/ProductItems'
import Loader from '../../../Shared/loader/loader'
import { cartContext } from '../../../../Context/cartContext'
import { toast } from 'react-toastify'
export default function RecentProducts() {
  const [count, setCount] = useState(0)
  let [products, setProducts] = useState([])
  let {addToCart} = useContext(cartContext)
  const navigate = useNavigate();
let [loading, setLoading] = useState({})
  function getProducts() {
    
    axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then(({ data }) => {
        setProducts(data.data)
 
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getProducts()

  }, [])

  async function addProductToCart(id) {
    if (!localStorage.getItem("userToken")) {
  navigate("/login");
  toast.info("Please login to add products to your cart.");
  return;
}
    setLoading(prev => ({ ...prev, [id]: true }))
    let data = await addToCart(id)
    console.log(data);
    setLoading(prev => ({ ...prev, [id]: false }))
    if (data.status == "success") {
          toast.success("product Added successfully");

    }else{
      toast.warn("fail to add product")
    }
  }
  return (
    <>
    {products.length!=0 &&<div className='flex flex-wrap gap-y-3 mb-8 mt-7'>
      
      
      {products.map(product => <ProductItems key={product.id} loading={loading[product.id]} addProductToCart={addProductToCart} product={product}/>
       )}

    </div>}
    
    {products.length==0 && <div className='w-full mb-16'><Loader /></div>}
    </>
  )
}
