import React, { useContext, useEffect, useState } from 'react'
import styles from './AllOrders.module.css'
import { jwtDecode } from 'jwt-decode'
import { cartContext } from '../../Context/cartContext'
import { tokenContext } from '../../Context/TokenContext'
import { RingLoader } from 'react-spinners'
import orderImage from '../../assets/11614845.gif'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'



export default function AllOrders() {
  const [count, setCount] = useState(0)
  let { getUserOrder } = useContext(cartContext)
  let { token } = useContext(tokenContext)
  let [orders, setOrders] = useState([])
  let [selectedItems, setSelectedItems] = useState([])
  let [displayModel, setDisplayModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)





  function getId() {

    let decoded = jwtDecode(token)
    getOrders(decoded.id)

  }
  async function getOrders(id) {
    setIsLoading(true);
    let data = await getUserOrder(id)
    console.log(data);
    setOrders(data)
    setIsLoading(false);
    console.log(data);



  }
  function openModal(items) {
    setSelectedItems(items)
    console.log(selectedItems);

    setDisplayModal(true)

  }
  function closeModal(items) {
    setDisplayModal(false)

  }
  useEffect(() => {
    token && getId()


  }, token)



  return (
    <>


      <Helmet>
        <title>All Orders</title>
      </Helmet>

      <div className="relative ">
        {isLoading ? (

          <div className=' w-full pt-5 container flex justify-center'>
            <img className='md:w-1/4 w-1/2 mt-16 mb-10' src={orderImage} />
          </div>
        ) : orders.length === 0 ? (

          <div className=' w-full pt-5 container mb-28 flex justify-center flex-col items-center mt-40'>
            <i class="fa-solid fa-x text-red-600 text-7xl"></i>
            <p className="text-gray-500 text-2xl md:text-4xl mb-8 mt-8 text-center">No orders yet , please shopping first  </p>
            <Link to={'/home'} className='bg-[#0aad0a] text-white text-lg  rounded-lg p-3'>Shopping now</Link>


          </div>
        ) : (
          <table className="w-full text-sm text-left md:mb-80 mb-16 md:mt-5 mt-3  rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700  bg-gray-50">
              <tr >
                <th scope="col" className="px-3 py-3   ">
                  Id
                </th>
                <th scope="col" className="px-3 py-3 ">
                  IsPaid
                </th>

                <th scope="col" className="px-3 py-3 ">
                  OrderPrice
                </th>
                <th scope="col" className="px-3 py-3 ">
                  View
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map(order =>
                <tr className="bg-white border-b border-gray-200">
                  <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">

                    {order.id}



                  </th>
                  <td className="px-3 py-3">
                    {order.isPaid ? 'paid' : 'Not Paid'}
                  </td>

                  <td className="px-5 py-3">
                    ${order.totalOrderPrice}
                  </td>
                  <td className="px-1 py-3">
                    <button onClick={() => openModal(order.cartItems)} type="button" class="text-white hover:bg-[#0aad0a] hover:text-white group  font-medium rounded-lg text-sm px-3 py-2.5 mb-2 "><i className='fa fa-eye text-[#0aad0a] text-xl group-hover:text-white'></i></button>

                  </td>

                </tr>
              )}
            </tbody>

          </table>
        )}
      </div>

      {displayModel && <div className='bg-[rgba(0,0,0,0.5)]  fixed inset-0  flex justify-center    '>
        <div className="content container mx-auto bg-white overflow-auto w-full mt-24 md:mt-24 md:w-1/2  rounded-md   p-4  ">
          <button> <i onClick={closeModal} className='fa fa-close'></i> </button>


          <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-2 ">

            <thead className="text-sm md:text-lg  text-gray-700  bg-gray-50 ">
              <tr>
                <th scope="col" className="px-2 py-3">
                  <span className='ps-2'> Product</span>
                </th>

                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className=" px-3 py-3">
                  Price
                </th>

              </tr>
            </thead>
            <tbody>
              {selectedItems.map(product =>
                <tr className="bg-white border-b md:text-lg  border-gray-200  ">
                  <td className="py-4 p-4">
                    <img src={product.product.imageCover} className="w-36  max-w-full max-h-full" alt="" />
                    {product.product.title.split(" ").splice(0, 2).join(" ")}
                  </td>
                  <td className="py-3 px-6">
                    <span>{product.count}</span>
                  </td>
                  <td className=" py-4  px-3 font-semibold text-gray-900 ">
                    ${product.price}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>}


    </>
  )
}
