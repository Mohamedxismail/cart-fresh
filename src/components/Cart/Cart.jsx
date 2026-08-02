import React, { lazy, useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { cartContext } from '../../Context/cartContext'
import { tokenContext } from '../../Context/TokenContext'
import { FadeLoader, RingLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Loader from '../Shared/loader/loader'
import { Helmet } from 'react-helmet'
export default function Cart() {

  let { cartDetails, removeProduct, updateCount } = useContext(cartContext)
  let { token } = useContext(tokenContext)
  let [deletedItem, setDeletedItem] = useState(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log(cartDetails);

  }, [cartDetails])
  async function deleteProduct(id) {
    setDeletedItem(id)
    let data = await removeProduct(id)
    setDeletedItem(null)
    console.log(data);
    if (data.status == "success") {
      toast.success("product removed successfully");
    } else {
      toast.warn("fail to remove")
    }

  }
  async function updateItem(id, count) {
    let data = await updateCount(id, count)

  }
  if (!cartDetails) {
    return <div className='mt-40 mb-20'><Loader /></div>
  }

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>

      {cartDetails && <div className='md:py-2 py-2'>
        <div className="flex mb-5 justify-between  ">
          <h1 className='md:text-3xl text-lg p-1'>Total Product  <span className='md:text-3xl text-lg   text-[#0aad0a]'>{cartDetails.numOfCartItems}</span> </h1>
          <h1 className='md:text-3xl text-lg p-1'>Total Price <span className='md:text-3xl text-lg   text-[#0aad0a]'>{cartDetails.data.totalCartPrice}</span> </h1>
        </div>


        <div className="relatve overflow-x-auto shadow-md sm:rounded-lg mt-3 ">

          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            {cartDetails.data.products.length == 0 ? <h1 className='md:text-5xl text-xl flex justify-center p-24'>Empty Cart</h1> :
              <thead className="text-sm md:text-lg  text-gray-700  bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-2 py-3">
                    <span className='ps-2'> Product</span>
                  </th>

                  <th scope="col" className="px-5 py-3">
                    Qty
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    Price
                  </th>
                  <th scope="col" className=" py-3">
                    Action
                  </th>
                </tr>
              </thead>}

            <tbody>
              {cartDetails.data.products.map(product =>
                <tr className="bg-white border-b md:text-lg  border-gray-200  ">
                  <td className="py-4 p-3">
                    <img src={product.product.imageCover} className="w-36  max-w-full max-h-full" alt="" />
                    {product.product.title.split(" ").splice(0, 2).join(" ")}
                  </td>

                  <td className="py-4">
                    <div className="flex items-center">
                      <button onClick={() => updateItem(product.product._id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-1 text-sm font-medium h-5 w-5 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200  " type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-2 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                        </svg>
                      </button>
                      <div>
                        <span>{product.count}</span>
                      </div>
                      <button onClick={() => updateItem(product.product._id, product.count + 1)} className="inline-flex items-center justify-center h-5 w-5 p-1 ms-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-2 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className=" py-4  px-3 font-semibold text-gray-900 ">
                    ${product.price}
                  </td>
                  <td className="">
                    {deletedItem === product.product._id ? (
                      <FadeLoader color="red" size={1} />
                    ) : (
                      <button
                        onClick={() => deleteProduct(product.product._id)}
                        className="font-medium text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <Link to={'/Checkout'} className='bg-[#0aad0a] text-white block mt-7 mb-5 text-center rounded-md p-3 '>Check Out</Link>
      </div>}

    </>
  )
}
