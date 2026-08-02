import { useState, useEffect, useContext, Suspense, lazy } from 'react';
import './App.css';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import { tokenContext } from './Context/TokenContext';
import LayOut from './components/LayOut/LayOut';
import ProtectedRoutes from './components/protectedRoutes/protectedRoutes';
import AuthView from './components/AuthView/AuthView';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FadeLoader } from 'react-spinners';
const Home = lazy(() => import('./components/Home/Home'));
const Categories = lazy(() => import('./components/Categories/Categories'));
const Brands = lazy(() => import('./components/Brands/Brands'));
const Products = lazy(() => import('./components/Products/Products'));
const Login = lazy(() => import('./components/Login/Login'));
const Register = lazy(() => import('./components/Register/Register'));
const Cart = lazy(() => import('./components/Cart/Cart'));
const Checkout = lazy(() => import('./components/Checkout/Checkout'));
const AllOrders = lazy(() => import('./components/AllOrders/AllOrders'));
const ChangePassword = lazy(() => import('./components/ChangePassword/ChangePassword'));
const ChangeUser = lazy(() => import('./components/ChangeUser/ChangeUser'));
const ProductDetails = lazy(() => import('./components/ProductDetails/ProductDetails'));
const NotFound = lazy(() => import('./components/NotFound/NotFound'));




function App() {
  const [count, setCount] = useState(0)
  let{setToken} = useContext(tokenContext)

  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      setToken(localStorage.getItem("userToken"))

    }

  },[])
  const routes = createBrowserRouter([
    {path:"",element:<LayOut/>,children:[
      { index: true, element: <Suspense><Home /></Suspense> },
      {path:"home" , element:<Home/>},
      {path:"categories",element:<Suspense><Categories/></Suspense>},
      {path:"productDetails/:id/:categoryId",element:<Suspense><ProductDetails/></Suspense>},
      {path:"brands",element:<Suspense><Brands/></Suspense>},
      {path:"products",element:<Suspense><Products/></Suspense>},
      {path:"login",element:<AuthView><Login/></AuthView>},
      {path:"register",element:<AuthView><Register/></AuthView>},
      {path:"cart",element:<ProtectedRoutes>
        <Cart/>
      </ProtectedRoutes>},
       {path:"checkout",element:<ProtectedRoutes>
        <Checkout/>
      </ProtectedRoutes>},
      {path:"changepassword",element:<ProtectedRoutes>
        <ChangePassword/>
      </ProtectedRoutes>},
      {path:"changeuser",element:<ProtectedRoutes>
        <ChangeUser/>
      </ProtectedRoutes>},
       {path:"allorders",element:<ProtectedRoutes>
        <AllOrders/>
      </ProtectedRoutes>},

      {path:"*",element:<NotFound/>},
    ]
    }
  ])

  return (
    <>

    <Suspense fallback={<div className='flex justify-center mt-28 text-4xl h-screen'><FadeLoader /></div>}>
      <RouterProvider router ={routes}/>

    </Suspense>
    
      
        
        
        
      <ToastContainer className='w' position='top-center'  autoClose={1400} toastStyle={{width:"290px",marginTop:"15px"}} draggable/>
      

      
    </>
  )
}

export default App
