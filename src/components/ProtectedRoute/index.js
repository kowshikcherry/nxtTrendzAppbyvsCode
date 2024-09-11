import { Navigate, useLocation, Outlet } from 'react-router-dom';
import Cookie from 'js-cookie';

const ProtectedRoute = () => {
  const token = Cookie.get('jwt_token');
  const location = useLocation();

  if (token === undefined) {
    // Redirect to /login and preserve the current location
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  // Render nested routes
  return <Outlet />;
};

export default ProtectedRoute;
