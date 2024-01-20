import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
    const authToken = useSelector((state) => state.signIn.authTokenUHelp);
    
    return authToken !== '' ? children : <Navigate to='/' />;
 
}
