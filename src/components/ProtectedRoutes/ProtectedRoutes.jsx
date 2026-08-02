import { Navigate } from "react-router-dom"

export default function ProtectedRoutes(props) {
    if (localStorage.getItem("userToken")) {
        return props.children
        
    }else{
        return   <>
         {/* return element */}
         <Navigate to={'/login'}/>
        </>
    }
    
}