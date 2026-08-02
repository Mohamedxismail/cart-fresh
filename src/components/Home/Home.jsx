import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import RecentProducts from './Component/RecentProducts/RecentProducts'
import PopularCategories from './Component/PopularCategories/popularCategories'
import StaticSlider from './Component/StaticSlider/StaticSlider'
import { Helmet } from 'react-helmet'
export default function Home() {
    const[count,setCount] = useState(0)
  return (
    <div >
      <Helmet>
        <title>Home</title>
      </Helmet>
      <StaticSlider/>
      <PopularCategories/>
      <RecentProducts/>
    </div>
  )
}
