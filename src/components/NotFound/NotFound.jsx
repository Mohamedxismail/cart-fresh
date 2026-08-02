import React, { useEffect, useState } from 'react'
import styles from './NotFound.module.css'
import NotFoundImage from '../../assets/error.svg'
export default function NotFound() {
    const[count,setCount] = useState(0)
  return (
    <div className='container mx-auto'>
      <img src={NotFoundImage} className='w-3/4 mx-auto' alt=""/>
      
    </div>
  )
}
