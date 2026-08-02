import React, { useEffect, useState } from 'react'
import styles from './LayOut.module.css'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import ScrollToTop from '../Home/Component/ScrollToTop/ScrollToTop'
export default function LayOut() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <ScrollToTop/>
      <NavBar />


      <div className="container mx-auto  mb-5">
        <Outlet />
      </div>

      <Footer />

    </div>
  )
}
