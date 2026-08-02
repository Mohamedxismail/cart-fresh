import React, { useContext, useEffect, useState } from 'react'
import styles from './ChangePassword.module.css'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { tokenContext } from '../../Context/TokenContext'
import { useFormik } from 'formik'
import axios from 'axios'
import { RingLoader } from 'react-spinners'
import { toast } from 'react-toastify'
export default function ChangePassword() {
  let [isCallingApi, setisCallingApi] = useState(false)
  let [apiError, setApiError] = useState(null)

  let { setToken, token } = useContext(tokenContext)
  let navigate = useNavigate()
  const headers = { token }

  const initialValues = {

    currentPassword: "",
    password: "",
    rePassword: "",
  }
  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().matches(new RegExp('^[a-zA-Z0-9]{8,12}$'), 'Invalid password').required("Required"),
    password: Yup.string().matches(new RegExp('^[a-zA-Z0-9]{8,12}$'), 'Invalid password').required("Required"),
    rePassword: Yup.string().oneOf([Yup.ref('password')], "Repassword must match password").required("Required"),
  })
  const passwordForm = useFormik({
    initialValues,
    validationSchema,

    onSubmit: CallChange

  })

  async function CallChange(values,{resetForm }) {
    try {
      setisCallingApi(true)
      setApiError(null)
      let { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', values, {headers})
      console.log(data);
      setisCallingApi(false)
      localStorage.removeItem("userToken")
      setToken(null)
      toast.success('Password changed successfully, please login again')
      navigate("/login")
      resetForm()

    } catch (error) {
      setApiError(error.response.data.message);
      setisCallingApi(false)
    }

  }


  return (
    <div className='container mx-auto mt-6  '>
      <form onSubmit={passwordForm.handleSubmit} className="w-[80%] mx-auto my-7 mb-12">
        <h1 className='text-2xl mb-8 text-black font-bold text-center pt-6 '>Update password </h1>

        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="currentPassword" value={passwordForm.values.currentPassword} onChange={passwordForm.handleChange} onBlur={passwordForm.handleBlur} id="floating_email" className="block py-2.5 px-0  focus:border-[#0aad0a] w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
          <label htmlFor="floating_email" className="absolute text-md text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-60 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Current password</label>
          {passwordForm.errors.currentPassword && passwordForm.touched.currentPassword ? <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {passwordForm.errors.currentPassword}
          </div> : ''}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="password" value={passwordForm.values.password} onChange={passwordForm.handleChange} onBlur={passwordForm.handleBlur} id="floating_password" className="block py-2.5 px-0  focus:border-[#0aad0a] w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
          <label htmlFor="floating_password" className="absolute text-md text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-60 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">New Password</label>
          {passwordForm.errors.password && passwordForm.touched.password ? <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {passwordForm.errors.password}
          </div> : ''}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="rePassword" value={passwordForm.values.rePassword} onChange={passwordForm.handleChange} onBlur={passwordForm.handleBlur} id="floating_repassword" className="block py-2.5 px-0  focus:border-[#0aad0a] w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
          <label htmlFor="floating_repassword" className="absolute text-md text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-60 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Repassword</label>
          {passwordForm.errors.rePassword && passwordForm.touched.rePassword ? <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {passwordForm.errors.rePassword}
          </div> : ''}
        </div>


        {apiError ? <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          {apiError}
        </div> : ''}
        {isCallingApi ? <div className='w-auto flex justify-end'>
          <button disabled type="button" className="text-white mt-4 mb-6 bg-[#0aad0a] opacity-75 rounded-lg box-border w-full ml-auto border border-transparent hover:bg-brand-strong  focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Updating
</button>
        </div> : <button type="submit" className="text-white mt-4 mb-6 bg-[#0aad0a] rounded-lg box-border w-full ml-auto border border-transparent hover:bg-brand-strong  focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Change Password</button>
        }




      </form>
    </div>

  )
}
