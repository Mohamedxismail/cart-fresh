import React, { useEffect, useState } from 'react'
import styles from './Loader.module.css'
import loader from '../../../assets/11614845.gif'
export default function Loader() {
    const[count,setCount] = useState(0)
  return (
    <div className='flex justify-center'>
      <img className='w-1/4 ' src={loader}/>
    </div>
  )
}
