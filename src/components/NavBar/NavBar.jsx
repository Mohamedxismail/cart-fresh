import React, { useContext, useEffect, useState } from 'react'
import styles from './NavBar.module.css';
import logo from '../../assets/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { counterContext } from '../../Context/CounterContext';
import { tokenContext } from '../../Context/TokenContext';
import { cartContext } from '../../Context/cartContext';
import shopIcon from '../../assets/OIP.webp';
import { jwtDecode } from 'jwt-decode'


export default function NavBar() {
  const [open, setOpen] = useState(false);
  let { token, setToken } = useContext(tokenContext)
  let { numOfCartItems } = useContext(cartContext)
  let [openUser, setOpenUser] = useState(false)
  let [userName, setUserName] = useState("")
  let navigate = useNavigate()
  console.log(token);


  function logOut() {
    // 1 - remove local storge
    localStorage.removeItem("userToken")


    // 2- set token null
    setToken(null)


    // 3- navigate login
    navigate('/login')

  }

  return (
    <>

      <nav className="bg-white mb-2 shadow-sm sticky top-0 z-50 right-0 left-0  ">
        <div className="container  mx-auto  flex items-center justify-between h-16">
          <div className="flex items-center  gap-4 ">
            <img src={logo} alt="" className="ms-1 h-8 md: w-32" />
            <div className="hidden lg:flex gap-5 font-medium ms-10">
              <NavLink to={''}>Home</NavLink>
              <NavLink to={'categories'}>Categories</NavLink>
              <NavLink to={'products'}>Products</NavLink>
              <NavLink to={'brands'}>Brands</NavLink>

              {token && (
                <>
                  <NavLink to={'cart'}>Cart {numOfCartItems}</NavLink>
                  <NavLink to={'allorders'}>Orders</NavLink>
                </>
              )}
            </div>


          </div>

          <div className="flex items-center gap-2 p-3 ">
            <div className="border-t sm:border-none  md:flex hidden ms-4 ">
              <ul className="flex gap-4 items-center px-10  container mx-auto">
                <a target='_blank' href='https://www.instagram.com/'><i className="fa-brands fa-instagram"></i></a>
                <a target='_blank' href='https://www.facebook.com/'><i className="fa-brands fa-facebook"></i></a>
                <a target='_blank' href='https://www.twitter.com/'><i className="fa-brands fa-twitter"></i></a>
                <a target='_blank' href='https://www.youtube.com/'><i className="fa-brands fa-youtube"></i></a>

              </ul>
            </div>
            <ul className="flex gap-3 ">
              {token ? <>
                <Link to={'cart'} className="bg-slate-400 flex justify-center me-2">
                  <img className='w-7 relative' src={shopIcon} />
                  <span className='absolute top-0 ms-2 mt-2  text-sm font-bold text-[#0aad0a] ' >{numOfCartItems > 9 ?
                    " +9 " : numOfCartItems}</span>
                </Link>
                {/* <i className="text-red-500 fa-solid fa-power-off  text-2xl mt-1 " onClick={logOut}></i> */}
                <div className='relative'>
                  <i onClick={() => setOpenUser(prev => !prev)} className="fa-solid fa-user fa-2x cursor-pointer"></i>
                  {openUser && <> <div className=' ms-10 flex flex-col w-[218px] absolute mt-5 rounded-lg z-50  bg-white shadow-xl p-4 right-0  '>
                    <div className="flex items-center gap-2 pb-3 mb-5 text-3xl border-b-2">
                      <i className="fa-regular fa-user text-2xl mt-1" ></i>
                      <h1 className='font-serif mt-1 ms-2  text-3xl  select-none'>Account</h1>
                    </div>
                    <div className='flex items-center justify-center  gap-2 pb-3'>
                      <i className="fa-solid fa-pen-to-square text-2xl"></i>
                      <Link to={'/changeuser'} className='w-full text-black font-medium select-none  ms-2  text-lg'>Edit Profile</Link>
                    </div>
                    <div className="flex items-center justify-center  gap-2 pb-1">
                      <i className="fa-solid fa-key text-2xl "></i>
                      <Link to={'/changepassword'} className='w-full text-black font-medium select-none pb-5 ms-2 mt-4 text-md '>Edit Password</Link>

                    </div>
                    <div className='flex items-center  cursor-pointer gap-3  ' onClick={logOut} >

                      <i className="text-red-500 fa-solid fa-arrow-right-from-bracket text-2xl   cursor-pointer"></i>
                      <span className='select-none  text-red-600 text-lg'>Log Out</span>
                    </div>




                  </div>

                  </>}
                </div>


              </>
                : <><li><NavLink to={'register'}>Register</NavLink></li>
                  <li><NavLink to={'login'}>Login</NavLink></li></>}
            </ul>



             <button
              className="lg:hidden text-xl p-1"
              onClick={() => setOpen(prev => !prev)}
            >
              ☰
            </button> 
          </div>
        </div>


        <div className="border-t sm:border-none md:hidden flex">
          <ul className="flex justify-center  gap-4 px-4 py-2 container mx-auto">
            <a target='_blank' href='https://www.instagram.com/'><i className="fa-brands fa-instagram"></i></a>
            <a target='_blank' href='https://www.facebook.com/'><i className="fa-brands fa-facebook"></i></a>
            <a target='_blank' href='https://www.twitter.com/'><i className="fa-brands fa-twitter"></i></a>
            <a target='_blank' href='https://www.youtube.com/'><i className="fa-brands fa-youtube"></i></a>
          </ul>
        </div>


        {open && (
          <div className="lg:hidden flex flex-col bg-white w-full px-4 py-4 gap-4 shadow-md">
            <NavLink to={''} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to={'categories'} onClick={() => setOpen(false)}>Categories</NavLink>
            <NavLink to={'products'} onClick={() => setOpen(false)}>Products</NavLink>
            <NavLink to={'brands'} onClick={() => setOpen(false)}>Brands</NavLink>

            {token && (
              <>
                <NavLink to={'cart'} onClick={() => setOpen(false)}>
                  Cart {numOfCartItems}
                </NavLink>

                <NavLink to={'allorders'} onClick={() => setOpen(false)}>
                  Orders
                </NavLink>
              </>
            )}
          </div>
        )}
      </nav>

    </>

  )
}
