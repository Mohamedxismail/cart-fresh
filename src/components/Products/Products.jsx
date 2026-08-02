import React, { useEffect, useState } from 'react'
import styles from './Products.module.css'
import Btn from '../Btn/btn'
import { useContext } from 'react'
import { counterContext } from '../../Context/counterContext'
import { Link, useNavigate  } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { cartContext } from '../../Context/cartContext'
import Loader from '../Shared/loader/loader'
import { theme } from 'flowbite-react'
import { FadeLoader } from 'react-spinners'
import { Helmet } from 'react-helmet'
export default function Products() {
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
    <Helmet>
        <title>Products</title>
      </Helmet>
    
    {products.length==0 && <div className='w-full mt-36 mb-10'><Loader /></div>}
     <div className='grid grid-cols-1 mt-7 mb-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'>
      { products.map(product => (
        <div key={product.id} className="bg-white shadow-lg p-3 rounded-lg group relative ">
          
          
          
            <img src={product.imageCover} className='mb-2 w-full ' alt={product.title} />
            
            <span className='text-[#0aad0a]'>{product.category.name}</span>
            <h2 className='font-medium'>{product.title.split(" ").splice(0,2).join(" ")}</h2>
            
            <div className="flex justify-between pt-3">
              <h3>{product.price} EGP</h3>
              <h4>
                <i className='fa fa-star text-yellow-400'></i> {product.ratingsAverage}
              </h4>
            </div>
            
          
          <button
            disabled={loading[product.id]}
            onClick={() => addProductToCart(product.id)}
            className='btn bg-[#0aad0a] w-full disabled:bg-green-500 text-white mt-3 rounded-lg p-2'
          >
            {loading[product.id] ? "Loading..." : "+ Add to Cart"}
          </button>
          <Link to={`/ProductDetails/${product.id}/${product.category._id}`}> <button className='btn bg-green-600 absolute bottom-24 mb-2 right-2  disabled:bg-green-500 text-white  mt-3  rounded-lg p-2  '>view<i className='fa-solid fa-eye ms-1'></i></button></Link>
          
        </div>
      )) 
        
      }
    </div>
    </>
  )
}
