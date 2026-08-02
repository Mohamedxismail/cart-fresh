import React, { useContext, useEffect, useState } from 'react'
import styles from './ChangeUser.module.css'
import { useNavigate } from 'react-router-dom'
import { tokenContext } from '../../Context/TokenContext'
import * as Yup from 'yup'
import axios from 'axios'
import { RingLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
export default function ChangeUser() {
    const[count,setCount] = useState(0)
let [isCallingApi, setisCallingApi] = useState(false)
  let [apiError, setApiError] = useState(null)

  let { setToken, token } = useContext(tokenContext)
  let navigate = useNavigate()
  const headers = { token }

  const initialValues = {

    name: "",
    phone: "",
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "min length is 3").max(15, "Max length is 15").required("Required"),
   phone: Yup.string().matches(new RegExp('^01[0125][0-9]{8}$'), "Invalid Phone").required("Required")
  })
  const UserForm = useFormik({
    initialValues,
    validationSchema,

    onSubmit: CallChange

  })

  async function CallChange(values,{resetForm }) {
    try {
      setisCallingApi(true)
      setApiError(null)
      let { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/users/updateMe/', values, {headers})
      console.log(data);
      setisCallingApi(false)
      localStorage.setItem("userName",data.user.name)
      console.log(data.user.name);     
      toast.success('Data Of User Updated')
      
      resetForm()

    } catch (error) {
      setApiError(error.response.data.message);
      setisCallingApi(false)
    }

  }


  return (
    <div className='container mx-auto mt-6 mb-5 pb-24'>
      <form onSubmit={UserForm.handleSubmit} className="w-[80%] mx-auto my-7">
        <h1 className='text-2xl mb-8 text-black font-bold text-center pt-6'>Update Profile </h1>

        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="name" value={UserForm.values.name} onChange={UserForm.handleChange} onBlur={UserForm.handleBlur} id="floating_email" className="block py-2.5 px-0  focus:border-[#0aad0a] w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
          <label htmlFor="floating_name" className="absolute text-md text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-60 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Edit Name</label>
          {UserForm.errors.name && UserForm.touched.name ? <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {UserForm.errors.name}
          </div> : ''}
        </div>
        <div className="relative z-0 w-full mb-5 mt-10 group">
          <input type="tel" name="phone" value={UserForm.values.phone} onChange={UserForm.handleChange} onBlur={UserForm.handleBlur} id="floating_password" className="block py-2.5 px-0  focus:border-[#0aad0a] w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
          <label htmlFor="floating_phone" className="absolute text-md text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-60 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"> Edit Phone</label>
          {UserForm.errors.phone && UserForm.touched.phone ? <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {UserForm.errors.phone}
          </div> : ''}
        </div>
        


        {apiError ? <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          {apiError}
        </div> : ''}
        {isCallingApi ? <div className='w-auto flex justify-end'>
          <button disabled type="button" className="text-white mt-5 bg-[#0aad0a] opacity-75 rounded-lg box-border w-full ml-auto border border-transparent hover:bg-brand-strong  focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Updating
</button>
        </div> : <button type="submit" className="text-white mt-5 bg-[#0aad0a] rounded-lg box-border w-full ml-auto border border-transparent hover:bg-brand-strong  focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Update Profile
</button>
        }




      </form>
    </div>

  )
}
