import React, {useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function RefrshHandler({setisAuthenticated}) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if (localStorage.getItem('token')){
            setisAuthenticated(true);
            if(location.pathname === '/'||
                location.pathname === '/login' ||
                location.pathname === 'signup'
            ){
                navigate('/home', { replace: false });
            }
        }
    },[location, navigate, setisAuthenticated])
  return (
    null
  )
}

export default RefrshHandler