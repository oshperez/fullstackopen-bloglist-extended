import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { loginUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";

import loginService from "../services/login";
import blogServices from "../services/blogs";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { username, password };
      const user = await loginService.login(credentials);

      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      blogServices.setToken(user.token);
      dispatch(loginUser(user));

    } catch (exception) {
      dispatch(setNotification("error", "wrong crerdentials", 5));
    }
    
    history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>log in to application</h1>
      <div>
        username{" "}
        <input
          type="text"
          value={username}
          name="Username"
          data-cy="login-username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{" "}
        <input
          type="password"
          value={password}
          name="Password"
          data-cy="login-password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" data-cy="login-submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
