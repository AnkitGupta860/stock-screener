import { React } from 'react';
import { Navigate, Outlet} from 'react-router-dom';

const PrivateComponenet = ()=>{
    const auth = localStorage.getItem('user');
    return auth?<Outlet />:<Navigate to="/signup"/>
}

export default PrivateComponenet;