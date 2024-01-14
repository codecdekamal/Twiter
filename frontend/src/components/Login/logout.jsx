import { Navigate } from "react-router-dom"
import { logOut } from "../../feature/loginContext"
import { removeUserDetails } from "../../feature/userContext"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
const Logout = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        localStorage.clear("accesstoken")
        dispatch(logOut())
        dispatch(removeUserDetails())
    },[])
    return <Navigate to="/login"></Navigate>
}

export default Logout;
