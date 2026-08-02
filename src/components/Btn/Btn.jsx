import React, { useEffect, useState } from 'react'
import styles from './Btn.module.css'
export default function Btn(props) {
    const[count,setCount] = useState(0)
  return (
    <div>
      Btn
      {props.children}
    </div>
  )
}
