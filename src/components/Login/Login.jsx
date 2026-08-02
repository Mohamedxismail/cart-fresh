import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { FadeLoader } from 'react-spinners'
import { useContext } from 'react'
import { tokenContext } from '../../Context/TokenContext'

export default function Login() {

  const [count, setCount] = useState(0)
  const [isCallingApi, setisCallingApi] = useState(false)
  const [apiErroe, setApiError] = useState(null)

  const { setToken } = useContext(tokenContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      navigate("/")
    }
  }, [])

  const initialValues = {
    email: '',
    password: '',
  }

  const demoUser = {
    email: "demo22@gmail.com",
    password: "123456789",
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Required"),
    password: Yup.string()
      .matches(new RegExp('^[a-zA-Z0-9]{8,12}$'), 'Invalid password')
      .required("Required"),
  })

  const loginForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: CallLogin,
  })

  async function CallLogin(values) {
    try {
      setisCallingApi(true)
      setApiError(null)

      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signin',
        values
      )

      localStorage.setItem("userToken", data.token)
      setToken(data.token)

      navigate("/")

    } catch (error) {
      setApiError(error.response?.data?.message)
    } finally {
      setisCallingApi(false)
    }
  }

  async function loginWithDemo() {
    try {

      setisCallingApi(true)
      setApiError(null)

      loginForm.setValues(demoUser)

      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        demoUser
      )

      localStorage.setItem("userToken", data.token)
      setToken(data.token)

      navigate("/")

    } catch (error) {

      setApiError(error.response?.data?.message)

    } finally {

      setisCallingApi(false)

    }
  }

  return (
    <div className='container mx-auto mt-6'>
      <form
        onSubmit={loginForm.handleSubmit}
        className="md:w-[70%] w-[90%] mx-auto my-7 mb-24"
      >

        <h1 className='text-3xl mb-6 text-black font-serif text-center md:pt-7 pt-6'>
          Login Now
        </h1>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">

          <h2 className="text-lg font-semibold text-green-700">
            🚀 Try Demo Account
          </h2>

          <p className="text-sm text-gray-600 mt-2">
            Explore the application instantly without creating a new account.
          </p>

          <button
            type="button"
            disabled={isCallingApi}
            onClick={loginWithDemo}
            className="mt-4 w-full rounded-lg border-2 border-[#0aad0a] bg-white px-4 py-3 font-semibold text-[#0aad0a] transition-all duration-300 hover:bg-[#0aad0a] hover:text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            🚀 Continue with Demo Account
          </button>

        </div>

        <div className="relative z-0 w-full mb-10 group">
          <input
            type="email"
            name="email"
            value={loginForm.values.email}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            id="floating_email"
            className="block py-2.5 px-0 focus:border-[#0aad0a] w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 peer"
            placeholder=" "
            required
          />

          <label
            htmlFor="floating_email"
            className="absolute text-lg text-body duration-300 transform -translate-y-8 scale-75 top-2 -z-10 origin-[0] peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-60 peer-focus:-translate-y-6"
          >
            User Email
          </label>

          {loginForm.errors.email && loginForm.touched.email && (
            <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
              {loginForm.errors.email}
            </div>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            value={loginForm.values.password}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            id="floating_password"
            className="block py-2.5 px-0 focus:border-[#0aad0a] w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 peer"
            placeholder=" "
            required
          />

          <label
            htmlFor="floating_password"
            className="absolute text-lg text-body duration-300 transform -translate-y-8 scale-75 top-2 -z-10 origin-[0] peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-60 peer-focus:-translate-y-6"
          >
            User Password
          </label>

          {loginForm.errors.password && loginForm.touched.password && (
            <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
              {loginForm.errors.password}
            </div>
          )}
        </div>

        <div className='flex justify-end mb-3'>
          <Link to={'/register'}>
            <span className='cursor-pointer text-green-700 hover:text-green-500'>
              Don't have an account ?
            </span>
          </Link>
        </div>

        {apiErroe && (
          <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
            {apiErroe}
          </div>
        )}

        {isCallingApi ? (
          <button
            disabled
            className="text-white bg-[#0aad0a] disabled:opacity-70 rounded-lg w-full mt-2 py-2.5 flex justify-center items-center gap-3"
          >

            <span>loading</span>
          </button>
        ) : (
          <button
            type="submit"
            className="text-white bg-[#0aad0a] rounded-lg w-full mt-2 py-2.5 hover:bg-green-700 transition"
          >
            Login
          </button>
        )}

      </form>
    </div>
  )
}