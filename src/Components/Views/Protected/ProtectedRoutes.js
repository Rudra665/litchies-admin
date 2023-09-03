import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom'

function ProtectedRoutes(props) {
    
    const { Component } = props;
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('login.email')==='admin' && localStorage.getItem('login.password')==='admin'){
            navigate("/admin/*")
        }
    },[])
        return (
        <div>
            <Component/>
        </div>
    );
}

export default ProtectedRoutes;