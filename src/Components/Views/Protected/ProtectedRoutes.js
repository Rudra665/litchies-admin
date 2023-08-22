import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom'

function ProtectedRoutes(props) {
    console.log('ppppppp');
    const { Component } = props;
    const navigate = useNavigate();
    const login = localStorage.getItem('login');
    useEffect(()=>{
        if(Object.entries(login.email)=='admin' && Object.entries(login.password)== 'admin'){
            navigate("/")
        }
    },[])
        return (
        <div>
            <Component/>
        </div>
    );
}

export default ProtectedRoutes;