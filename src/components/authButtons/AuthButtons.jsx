import { Link } from "react-router";

const AuthButtons = () => {
  return (
    <div className="flex items-center gap-4">
      <Link
        to="/login"
        className="px-7 py-2 rounded  border border-l-primary border-t-primary border-b-secondary border-r-secondary text-base font-semibold bg-linear-to-br from-primary to-secondary bg-clip-text text-transparent cursor-pointer active:scale-[99%]"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="px-7 py-2 rounded bg-linear-to-br from-primary to-secondary text-base font-semibold text-white hover:bg-linear-to-tl cursor-pointer active:scale-[99%]"
      >
        Register
      </Link>
    </div>
  );
};

export default AuthButtons;
