import { Navigate } from "react-router-dom";

const ProctectedDashBoardRoute = ({ children}) => {
  const islogged = localStorage.getItem("loggedIn")
  if (!JSON.parse(islogged)) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default ProctectedDashBoardRoute;
