import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer";
import { NavDropdown } from "react-bootstrap";
import { BoxArrowRight, Person } from "react-bootstrap-icons";

const UserStatus = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  console.log("user prop inside User status", user);

  const handleClick = () => {
    history.push(`/users/${user.id}`);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBloglistUser");
    dispatch(logoutUser());
    history.push("/login");
  };

  if (!user) return null;

  return (
    <NavDropdown
      className="ms-3 border border-secondary rounded"
      title={user.name}
      menuVariant="dark"
    >
      <NavDropdown.Item onClick={handleClick}>
        <Person className="me-2" size={23} />
        Profile
      </NavDropdown.Item>
      <NavDropdown.Item onClick={handleLogout}>
        <BoxArrowRight className="me-2" size={23} onClick={handleLogout} />
        Log out
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default UserStatus;
