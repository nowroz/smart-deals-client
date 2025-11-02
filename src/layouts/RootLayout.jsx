import { Outlet, useNavigation } from "react-router";
import Navbar from "../components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import LoadingPage from "../pages/LoadingPage";

const RootLayout = () => {
  const navigation = useNavigation();
  const isLoading = Boolean(navigation.location);

  return (
    <>
      <header className="bg-base-200">
        <Navbar></Navbar>
      </header>
      <main>{isLoading ? <LoadingPage></LoadingPage> : <Outlet></Outlet>}</main>
      <ToastContainer
        position="top-center"
        newestOnTop
        autoClose={3000}
      ></ToastContainer>
    </>
  );
};

export default RootLayout;
