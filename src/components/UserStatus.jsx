import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";

const UserStatus = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBloglistUser");
    dispatch(logoutUser());
  };
  return (
    <div>
      <span>
        {`${user.name} logged in`}{" "}
        <button onClick={handleLogout}>logout</button>
      </span>
    </div>
  );
};

export default UserStatus;
