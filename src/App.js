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
import Footer from "./components/Footer";

import { Container } from "react-bootstrap";

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

  const blogForm = () => {
    return (
      <Togglable buttonLabel="add blog" ref={blogFormRef}>
        <BlogForm ref={blogFormRef} />
      </Togglable>
    );
  };

  return (
    <Container fluid className="p-0">
      {notification ? <Notification notification={notification} /> : null}
      {loggedInUser ? <NavBar user={loggedInUser} /> : null}
      <Container style={{ minHeight: "80vh" }}>
        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <UserTable />
          </Route>
          <Route path="/">
            <BlogList blogForm={blogForm} />
          </Route>
        </Switch>
      </Container>
      {loggedInUser ? <Footer /> : null}
    </Container>
  );
};

export default App;
