import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer";

const UserStatus = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory()

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBloglistUser");
    dispatch(logoutUser());
    history.push("/login")
  };

  if (!user) return null;
  
  return (
    <span>
      {`${user.name} logged in`} <button onClick={handleLogout}>logout</button>
    </span>
  );
};

export default UserStatus;
