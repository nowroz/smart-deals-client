import { Link } from "react-router";

const AuthButtons = () => {
  return (
    <div className="flex items-center gap-4">
      <Link to="/login" className="px-7 py-2 btn-secondary">
        Login
      </Link>
      <Link to="/register" className="px-7 py-2 btn-primary">
        Register
      </Link>
    </div>
  );
};

export default AuthButtons;
