import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUser, signInUserWithGoogle } = useContext(AuthContext);

  const handleSignIn = (event) => {
    event.preventDefault();

    const form = event.target;

    const email = form.email.value.trim();
    const password = form.password.value;

    console.log("Login:", email, password);

    signInUser(email, password)
      .then((userCredential) => {
        toast.success("Logged in successfully!");
        form.reset();
      })
      .catch((error) => console.error(error.message));
  };

  const handleSignInWithGoogle = (event) => {
    event.preventDefault();

    signInUserWithGoogle()
      .then((result) => {
        toast.success("Logged in successfully!");
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <section className="custom-container mx-auto flex items-center justify-center py-20">
      <title>Register - Smart Deals</title>
      <div className="w-[40%] bg-base-200 p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold text-base-content text-center mb-2">
          Login
        </h1>
        <p className="text-base-content text-center mb-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium bg-linear-to-br from-primary to-secondary bg-clip-text text-transparent"
          >
            Register Now
          </Link>
        </p>

        <form onSubmit={handleSignIn}>
          <fieldset className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium text-base-content"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                autoComplete="on"
                required
                className="px-3 py-2 border border-[#E9E9E9] rounded focus:outline-[#E9E9E9]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium text-base-content"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                autoComplete="new-password"
                required
                className="px-3 py-2 border border-[#E9E9E9] rounded focus:outline-[#E9E9E9]"
              />
            </div>
          </fieldset>

          <div className="flex flex-col gap-6">
            <button className="px-4 py-3 rounded bg-linear-to-br from-primary to-secondary font-semibold text-white cursor-pointer active:scale-[99%]">
              Sign In
            </button>

            <div className="flex items-center gap-2">
              <hr className="flex-1 border-[#E9E9E9]"></hr>
              <h2 className="font-semibold">OR</h2>
              <hr className="flex-1 border-[#E9E9E9]"></hr>
            </div>

            <button
              onClick={handleSignInWithGoogle}
              type="button"
              className="px-4 py-3 border border-[#D2D2D2] rounded font-semibold cursor-pointer active:scale-[99%] flex items-center justify-center gap-2"
            >
              <FcGoogle size={24}></FcGoogle> Sign In With Google
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
