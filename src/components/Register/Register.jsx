import React, { useEffect, useState } from 'react'
import styles from './Register.module.css'
import { useFormik } from 'formik'
import * as  Yup from 'yup'
import axios from 'axios'
import { RingLoader } from "react-spinners";
import { Link, useNavigate } from 'react-router-dom'


export default function Register() {
  const [count, setCount] = useState(0)
  let [isCallingApi, setisCallingApi] = useState(false)
  let [apiErroe, setApiError] = useState(null)


  let navigate = useNavigate()

  const initialValues = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: ''
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "min length is 3").max(15, "Max length is 15").required("Required"),
    email: Yup.string().email("Invalid Email").required("Required"),
    password: Yup.string().matches(new RegExp('^[a-zA-Z0-9]{8,12}$'), 'Invalid password').required("Required"),
    rePassword: Yup.string().oneOf([Yup.ref('password')], "Repassword must match password").required("Required"),
    phone: Yup.string().matches(new RegExp('^01[0125][0-9]{8}$'), "Invalid Phone").required("Required")
  })
  const registerForm = useFormik({
    initialValues,
    validationSchema,

    onSubmit: CallRegister

  })

  async function CallRegister(values) {
    try {
      setisCallingApi(true)
      setApiError(null)
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      console.log(data);
      setisCallingApi(false)
      navigate("/Login")

    } catch (error) {
      setApiError(error.response.data.message);
      setisCallingApi(false)
    }

  }


  return (
    <div className='container mx-auto mt-6 '>
      <form onSubmit={registerForm.handleSubmit} className="md:w-[70%] w-[90%] mx-auto my-7 mb-10">
        <h1 className='text-3xl mb-9 text-black text-center md:pt-7 pt-6 font-serif'>Register Now </h1>
        <div className="relative z-0 w-full mb-7 group">
          <input type="text" name="name" value={registerForm.values.name} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} id="floating_name" className="block py-2.5 px-0  focus:border-[#0aad0a] w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
          <label htmlFor="floating_name" className="absolute text-lg text-body duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-70 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">User Name</label>
          {registerForm.errors.name && registerForm.touched.name ? <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {registerForm.errors.name}
          </div> : ''}
        </div>
        <div className="relative z-0 w-full mb-7 group">
          <input type="email" name="email" value={registerForm.values.email} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} id="floating_email" className="block py-2.5 px-0  focus:border-[#0aad0a] w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
          <label htmlFor="floating_email" className="absolute text-lg text-body duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-70 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">User Email</label>
          {registerForm.errors.email && registerForm.touched.email ? <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {registerForm.errors.email}
          </div> : ''}
        </div>
        <div className="relative z-0 w-full mb-7 group">
          <input type="password" name="password" value={registerForm.values.password} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} id="floating_password" className="block py-2.5 px-0  focus:border-[#0aad0a] w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
          <label htmlFor="floating_password" className="absolute text-lg text-body duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-70 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">User Password</label>
          {registerForm.errors.password && registerForm.touched.password ? <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {registerForm.errors.password}
          </div> : ''}
        </div>
        <div className="relative z-0 w-full mb-7 group">
          <input type="password" name="rePassword" value={registerForm.values.rePassword} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} id="floating_repassword" className="block py-2.5 px-0  focus:border-[#0aad0a] w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
          <label htmlFor="floating_repassword" className="absolute text-lg text-body duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-70 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Repassword</label>
          {registerForm.errors.rePassword && registerForm.touched.rePassword ? <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {registerForm.errors.rePassword}
          </div> : ''}
        </div>
        <div className="relative z-0 w-full mb-7 group">
          <input type="tel" name="phone" id="floating_phone" value={registerForm.values.phone} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} className="block py-2.5 px-0  focus:border-[#0aad0a] w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
          <label htmlFor="floating_phone" className="absolute text-lg text-body duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-70 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">User Phone</label>
          {registerForm.errors.phone && registerForm.touched.phone ? <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {registerForm.errors.phone}
          </div> : ''}
        </div>
        <div className=' flex justify-end mb-5 '>
          <Link to={'/login'}><span className='cursor-pointer text-green-700 hover:text-green-500'>Already have an account ?</span></Link>
        </div>
        {apiErroe ? <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          {apiErroe}
        </div> : ''}
        {isCallingApi ? <div className='w-auto flex justify-end'>
          <button disabled className="text-white bg-[#0aad0a] rounded opacity-75  box-border w-full ml-auto border border-transparent hover:bg-brand-strong  focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-md px-4 py-2.5 focus:outline-none">Loading</button>
        </div> : <button type="submit" className="text-white bg-[#0aad0a] rounded  box-border w-full ml-auto border border-transparent hover:bg-brand-strong  focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-md px-4 py-2.5 focus:outline-none">Submit</button>
        }




      </form>
    </div>

  )
}
