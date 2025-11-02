import { useContext } from "react";
import NavigationLink from "../navigationLink/NavigationLink";
import { visibleNavPaths, hiddenNavPaths } from "../../navPath/navPath.js";
import AuthContext from "../../contexts/AuthContext";
import AuthButtons from "../authButtons/AuthButtons";
import LoggedInUser from "../loggedInUser/LoggedInUser";
import { BeatLoader, PropagateLoader, ScaleLoader } from "react-spinners";

const Navbar = () => {
  const { user, isLoading } = useContext(AuthContext);

  const visibleNavLinks = visibleNavPaths.map((navPath) => (
    <NavigationLink key={navPath.id} navPath={navPath}></NavigationLink>
  ));

  const hiddenNavLinks = hiddenNavPaths.map((navPath) => (
    <NavigationLink key={navPath.id} navPath={navPath}></NavigationLink>
  ));

  return (
    <nav className="custom-container mx-auto py-5 grid grid-cols-4">
      <h3 className="text-3xl font-bold">
        Smart
        <span className="bg-linear-to-br from-primary to-secondary bg-clip-text text-transparent">
          Deals
        </span>
      </h3>
      <ul className="col-span-2 justify-self-center flex items-center gap-8">
        {visibleNavLinks}
        {isLoading && <BeatLoader size={10}></BeatLoader>}
        {user && hiddenNavLinks}
      </ul>
      <div className="justify-self-end">
        {isLoading ? (
          <ScaleLoader height={20}></ScaleLoader>
        ) : user ? (
          <LoggedInUser photoURL={user.photoURL}></LoggedInUser>
        ) : (
          <AuthButtons></AuthButtons>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
