import { Link } from "react-router-dom";
import UserStatus from "../components/UserStatus";

const linkStyles = {
  marginRight: "0.5rem",
};

const NavBar = ({ user }) => {
  return (
    <nav style={{ backgroundColor: "lightblue", padding: "0.5rem" }}>
      <Link style={linkStyles} to="/">
        blogs
      </Link>
      <Link style={linkStyles} to="/users">
        users
      </Link>
      <UserStatus user={user} />
    </nav>
  );
};

export default NavBar;
