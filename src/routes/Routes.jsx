import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import MyProducts from "../pages/MyProducts";
import MyBids from "../pages/MyBids";
import CreateProduct from "../pages/CreateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-products",
        Component: AllProducts,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "my-products",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "my-bids",
        element: (
          <PrivateRoute>
            <MyBids></MyBids>
          </PrivateRoute>
        ),
      },
      {
        path: "create-product",
        element: (
          <PrivateRoute>
            <CreateProduct></CreateProduct>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
