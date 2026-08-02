import React, { useEffect, useState } from 'react'
import styles from './Footer.module.css'
import master from '../../assets/mastercard.svg'
import amazon from '../../assets/amazon-pay.svg'
import americanicon from '../../assets/american-express.svg'
import appstore from '../../assets/app-store.png'
import googlestore from '../../assets/google.png'



export default function Footer() {
  const [count, setCount] = useState(0)
  return (
    <footer className='bg-[rgb(242,242,242)]  p-6   '>
      <div className="container mx-auto w-full  ">
        <h2 className='text-2xl text-[#212529] mb-2'>Get The FreshCart app</h2>
        <p className='text-[#6d767e] font-light mb-3'>We will send you a link , open it on your phone to download the app</p>
        <div className="md:flex mb-4">
          <input className="bg-neutral-secondary-medium md:w-3/4 w-full md:mb-0 mb-3 border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block grow me-3 px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="name@flowbite.com" required />
          <button className='bg-[#0aad0a] text-light text-white rounded-md p-2 md:w-2/12 w-full'>Share app link</button>
        </div>
        <div className="partner md:flex md:justify-between justify-items-center    py-6 border-y-2">
          <div className="payment flex items-center gap-4">
            <h1 className='text-md'>payment partners</h1>
            <img src={amazon} className='w-[40px]'/>
            <img src={americanicon} className='w-[40px]'/>
            <img src={master} className='w-[40px]'/>
            
          </div>
          <div className="app flex items-center justify-center gap-3 ">
            <p className='text-md'>Get deliveries with FreshCart</p>
            <img src={appstore} className='w-[30px]'/>
            <img src={googlestore} className='w-[55px]'/>
            
            
          </div>
        </div>
      </div>


    </footer>
  )
}
