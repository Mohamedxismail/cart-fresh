import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import CounterContextProvider from './Context/CounterContext.jsx';
import TokenContextProvider from './Context/TokenContext.jsx';
import CartContextProvider from './Context/cartContext.jsx';
import BrandContextProvider from './Context/BrandContext.jsx';
import CategoryContextProvider from './Context/categoryContext.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenContextProvider>
      <CartContextProvider>
      <CounterContextProvider>
        <BrandContextProvider>
        <CategoryContextProvider>
        <App />
        </CategoryContextProvider>
        </BrandContextProvider>
      </CounterContextProvider>
      </CartContextProvider>
    </TokenContextProvider>



  </StrictMode>,
)
