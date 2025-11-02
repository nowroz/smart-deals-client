import { NavLink } from "react-router";

const NavigationLink = ({ navPath }) => {
  const { name, path } = navPath;

  return (
    <li>
      <NavLink
        className={({ isActive, isPending }) =>
          isPending
            ? "font-medium text-gray-400"
            : isActive
              ? "font-medium bg-linear-to-br from-primary to-secondary bg-clip-text text-transparent"
              : "font-medium text-black"
        }
        to={path}
      >
        {name}
      </NavLink>
    </li>
  );
};

export default NavigationLink;
