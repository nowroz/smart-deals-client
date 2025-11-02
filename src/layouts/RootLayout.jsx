import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <>
      <header className="bg-base-200">
        <Navbar></Navbar>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <ToastContainer
        position="top-center"
        newestOnTop
        autoClose={3000}
      ></ToastContainer>
    </>
  );
};

export default RootLayout;
