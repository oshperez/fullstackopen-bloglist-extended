import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { loginUser, initializeUsers } from "./reducers/userReducer";
import { setNotification } from "./reducers/notificationReducer";

import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import UserStatus from "./components/UserStatus";
import UserTable from "./components/UserTable";

import blogServices from "./services/blogs";
import userServices from "./services/users";

import "./App.css";

const App = () => {
  const loggedInUser = useSelector((state) => state.users.loggedInUser);
  const notification = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  //Reference to blog form
  const blogFormRef = useRef();

  useEffect(() => {
    // Fetches blogs from database
    (async function () {
      try {
        const blogs = await blogServices.getAll();
        dispatch(initializeBlogs(blogs));

        const users = await userServices.getAll();
        console.log(users);
        dispatch(initializeUsers(users));
      } catch (error) {
        dispatch(
          setNotification(
            "error",
            `error loading resources ${error.message} `,
            5
          )
        );
      }
    })();

    // Saves user and token to the browser's local storage
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log("logged-in user", user);
      dispatch(loginUser(user));
      blogServices.setToken(user.token);
    }
  }, [dispatch]);

  // Returns blog form

  const blogForm = () => {
    return (
      <Togglable buttonLabel="add blog" ref={blogFormRef}>
        <BlogForm ref={blogFormRef} />
      </Togglable>
    );
  };

  return (
    <div className="container">
      {notification ? <Notification notification={notification} /> : null}
      <div className="app">
        {!loggedInUser ? (
          <LoginForm />
        ) : (
          <div>
            <div>
              <h2>blogs</h2>
              <UserStatus user={loggedInUser} />
              <br />
              {blogForm()}
              <BlogList />
            </div>
            <div>
              <h2>Users</h2>
              <UserTable />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
