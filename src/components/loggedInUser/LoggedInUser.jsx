import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const LoggedInUser = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Logged out succcessfully!");
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <div className="flex items-center gap-4">
      <img
        src={user.photoURL}
        className="w-10 h-10 p-1 border border-[#E9E9E9] rounded-full"
      ></img>
      <button
        onClick={handleSignOut}
        className="px-7 py-2 rounded bg-linear-to-br from-primary to-secondary text-base font-semibold text-white hover:bg-linear-to-tl cursor-pointer active:scale-[99%]"
      >
        Sign Out
      </button>
    </div>
  );
};

export default LoggedInUser;
