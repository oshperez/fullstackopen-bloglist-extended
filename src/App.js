import React, { useEffect, useRef } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { initializeBlogs } from "./reducers/blogReducer";
import { loginUser, initializeUsers } from "./reducers/userReducer";
import { setNotification } from "./reducers/notificationReducer";

import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import NavBar from "./components/NavBar";
import UserTable from "./components/UserTable";
import User from "./components/User";

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
        {loggedInUser ? <NavBar user={loggedInUser} /> : null}
        <div>
          <Switch>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path="/users">
              <div>
                <h2>Users</h2>
                <UserTable />
              </div>
            </Route>
            <Route path="/">
              <h2>blogs</h2>
              <div>
                {blogForm()}
                <BlogList />
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
