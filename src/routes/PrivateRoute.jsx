import { Children, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { Navigate } from "react-router";
import LoadingPage from "../pages/LoadingPage";

const PrivateRoute = ({ children }) => {
  const { isLoading, user } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
