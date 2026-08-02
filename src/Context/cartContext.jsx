import { createContext, useContext, useEffect, useState } from "react";
import { tokenContext } from "./TokenContext";
import axios from "axios";

export const cartContext = createContext()


export default function CartContextProvider({ children }) {
  const { token } = useContext(tokenContext)

  const [cartDetails, setCartDetals] = useState(null)
  const [numOfCartItems, setNumOfCartItems] = useState(0)
  const [cartId, setCartId] = useState('')

  const API_URL = 'https://ecommerce.routemisr.com/api/v1/cart'
  const API_ORDER_URL = 'https://ecommerce.routemisr.com/api/v1/orders'
  const headers = { token }

  useEffect(() => {
    token && getCart()
  }, [token])

  async function addToCart(productId) {
    const { data } = await axios.post(API_URL, { productId }, { headers })

    if (data.status === "success") {
      setNumOfCartItems(data.numOfCartItems)
      await getCart()
    }

    return data
  }

  async function getCart() {
    const { data } = await axios.get(API_URL, { headers })

    if (data.status === "success") {
      setNumOfCartItems(data.numOfCartItems)
      setCartDetals(data)
    }
    setCartId(data.cartId)
    setCartDetals(data)

    return data
  }

  async function removeProduct(id) {
    const { data } = await axios.delete(`${API_URL}/${id}`, { headers })

    if (data.status === "success") {
      setNumOfCartItems(data.numOfCartItems)
      await getCart()
    }
    console.log(data, "deleted");


    return data
  }
  async function updateCount(id, count) {
    const { data } = await axios.put(`${API_URL}/${id}`, { count }, { headers })

    if (data.status === "success") {
      setNumOfCartItems(data.numOfCartItems)
      await getCart()
    }

    return data
  }
  async function cashOnDelivery(shippingAddress) {
    const { data } = await axios.post(`${API_ORDER_URL}/${cartId}`, { shippingAddress }, { headers })
    if (data.status == "success") {
      getCart()
    }


    return data
  }
  async function onlinePayment(shippingAddress) {
    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`, { shippingAddress }, { headers })
    // if(data.status == "success"){
    //   getCart()
    // }


    return data
  }
  async function getUserOrder(id) {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    

    return data
  }

  return (
    <cartContext.Provider value={{
      cartDetails,
      numOfCartItems,
      addToCart,
      getCart,
      removeProduct,
      updateCount,
      cashOnDelivery,
      onlinePayment,
      getUserOrder
    }}>
      {children}
    </cartContext.Provider>
  )
}


