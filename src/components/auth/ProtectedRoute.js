import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function ProtectedRoute({ component: Component }) {
    const navigate = useNavigate();
    
    useEffect(() => {
        let login = localStorage.getItem('login');
        console.log(login);
        if (!login) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div>
            <Component />
        </div>
    );
}
