import React, { use, useContext, useEffect, useState } from 'react'
import styles from './Checkout.module.css'
import { tokenContext } from '../../Context/TokenContext'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { cartContext } from '../../Context/cartContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
export default function Checkout() {
  let [isCallingApi, setisCallingApi] = useState(false)
  let [apiErroe, setApiError] = useState(null)
  let [isOnline,setIsOnline] = useState(false)
  let { setToken } = useContext(tokenContext)
  let { cashOnDelivery ,onlinePayment} = useContext(cartContext)
  const navgiate = useNavigate()



  const initialValues = {

    details: '',
    phone: '',
    city: '',
  }
  const validationSchema = Yup.object().shape({
    details: Yup.string().required("Required"),
    phone: Yup.string().matches(new RegExp('^01[0125][0-9]{8}$'), "Invalid Phone").required("Required"),
    city: Yup.string().required("Required"),
  })
  const shippingForm = useFormik({
    initialValues,
    validationSchema,

    onSubmit: callPayment

  })

  async function callPayment(values,{resetForm }) {
    try {
      setisCallingApi(true)
      if(isOnline){
        
         let x = await onlinePayment(values)
         console.log(values);
         console.log(x);
         
         window.location.href= x.session.url
        
         setisCallingApi(false)

      }else {
         let x = await cashOnDelivery(values)
         console.log(values);
         setisCallingApi(false)
         if (x.status == "success") {
        toast.success("successfully pay");
        resetForm()
        navgiate('/allorders')
        
      }
      }    
    } catch (error) {

      toast.warn("fail to pay")
      setisCallingApi(false)
      

    }

  }



  return (
    <div className='container mx-auto mt-6 '>
      <form onSubmit={shippingForm.handleSubmit} className="md:w-[70%] w-[90%] mx-auto my-7 mb-24">
        <h1 className='text-3xl mb-5 text-center text-black font-serif md:pt-3 pt-3 '>Pay Now </h1>

        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="details" value={shippingForm.values.details} onChange={shippingForm.handleChange} onBlur={shippingForm.handleBlur} id="details" className="block py-2.5 px-0  focus:border-[#0aad0a] w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
          <label htmlFor="details" className="absolute text-md text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"> Details</label>
          {shippingForm.errors.details && shippingForm.touched.details ? <div className="p-2 mt-1 mb-4 text-md text-red-800 rounded-lg bg-red-50" role="alert">
            {shippingForm.errors.details}
          </div> : ''}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="tel" name="phone" value={shippingForm.values.phone} onChange={shippingForm.handleChange} onBlur={shippingForm.handleBlur} id="phone" className="block py-2.5 px-0  focus:border-[#0aad0a] w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
          <label htmlFor="phone" className="absolute text-md text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"> phone</label>
          {shippingForm.errors.phone && shippingForm.touched.phone ? <div className="p-2 mt-1 mb-4 text-md text-red-800 rounded-lg bg-red-50" role="alert">
            {shippingForm.errors.phone}
          </div> : ''}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="city" value={shippingForm.values.city} onChange={shippingForm.handleChange} onBlur={shippingForm.handleBlur} id="city" className="block py-2.5 px-0  focus:border-[#0aad0a] w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
          <label htmlFor="city" className="absolute text-md text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"> city</label>
          {shippingForm.errors.city && shippingForm.touched.city ? <div className="p-2 mt-1 mb-4 text-md text-red-800 rounded-lg bg-red-50" role="alert">
            {shippingForm.errors.city}
          </div> : ''}
        </div>
        <div className="relative z-0 w-full mb-5 group">
        <input type='checkbox' value="online" onChange={()=>setIsOnline(true)}></input>
        <label className='ms-2'>Online Payment</label>
        </div>


        {apiErroe ? <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          {apiErroe}
        </div> : ''}
        {isCallingApi ? <div className='w-auto flex justify-end'>
          <button disabled className="text-white bg-[#0aad0a] opacity-75 mt-3  rounded-md box-border w-full  ml-auto border border-transparent hover:bg-brand-strong  focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-md px-4 py-2.5 focus:outline-none">Loading</button>
        </div> : <button type="submit" className="text-white bg-[#0aad0a] mt-3  rounded-md box-border w-full  ml-auto border border-transparent hover:bg-brand-strong  focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-md px-4 py-2.5 focus:outline-none">Pay Now</button>
        }

      </form>
    </div>

  )

}
