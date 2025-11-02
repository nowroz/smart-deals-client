import { Children, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { isLoading, user } = useContext(AuthContext);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
