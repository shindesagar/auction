import { Outlet, Navigate } from 'react-router-dom';
import AuthUser from '../../components/auth/AuthUser';
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRoute({ component: Component }) {
    const { token } = AuthUser();
    const isTokenExpired = (token) => {
        if (!token) {
            return true;
        }
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    };
    const isExpired = isTokenExpired(token);
    if(isExpired) localStorage.setItem('login',false)
    
    return (
        <div>
            {!isExpired ? <Outlet /> : <Navigate to="/login" />}
        </div>
    );
}
