import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { loginUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";

import loginService from "../services/login";
import blogServices from "../services/blogs";

import { Form, Card, Button, Container } from "react-bootstrap";

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
      history.push("/");
    } catch (exception) {
      dispatch(setNotification("error", "wrong crerdentials", 5));
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5 ">
      <Card>
        <Card.Body className="py-4">
          <Card.Title as="h1" className="fw-light mb-4">
            log in to application
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="Username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                data-cy="login-username"
                placeholder="Enter username"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="Password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                data-cy="login-password"
                placeholder="Password"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" data-cy="login-submit">
              login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginForm;
