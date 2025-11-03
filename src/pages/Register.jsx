import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, updateUserProfile, signInUserWithGoogle } =
    useContext(AuthContext);

  const handleRegister = (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const photoURL = form.imageURL.value.trim();
    const password = form.password.value;

    console.log("Register:", name, email, photoURL, password);

    createUser(email, password)
      .then((userCredential) => {
        updateUserProfile(name, photoURL)
          .then(() => {
            const newUser = { name, email, image: photoURL };
            fetch("http://localhost:3000/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newUser),
            })
              .then((res) => res.json())
              .then((data) => {
                toast.success("Registration complete!");
                form.reset();
              });
          })
          .catch((error) => console.error(error.message));
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleSignInWithGoogle = () => {
    signInUserWithGoogle()
      .then((result) => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success("Registration complete!");
          });
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <section className="custom-container mx-auto flex items-center justify-center py-20">
      <title>Register - Smart Deals</title>
      <div className="w-[40%] bg-base-200 p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold text-base-content text-center mb-2">
          Register Now!
        </h1>
        <p className="text-base-content text-center mb-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium bg-linear-to-br from-primary to-secondary bg-clip-text text-transparent"
          >
            Login Now
          </Link>
        </p>

        <form onSubmit={handleRegister}>
          <fieldset className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium text-base-content"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                autoComplete="on"
                required
                className="px-3 py-2 border border-[#E9E9E9] rounded focus:outline-[#E9E9E9]"
              />
            </div>
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
                htmlFor="imageURL"
              >
                Image-URL
              </label>
              <input
                type="text"
                name="imageURL"
                id="imageURL"
                placeholder="https://example.com/picture.png"
                autoComplete="on"
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
              Register
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
              <FcGoogle size={24}></FcGoogle> Sign Up With Google
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
