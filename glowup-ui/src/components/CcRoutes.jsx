import { Navigate } from "react-router-dom";

const CcProtectedRoute = ({ children}) => {
  const isloggedIn = localStorage.getItem("careUserLoggedIn");
  if (!JSON.parse(isloggedIn)) {
    return <Navigate to="/customer-care/login" replace />;
  } else {
    return children;
  }
};

export default CcProtectedRoute;
