import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";

const User = () => {
  const routeMatch = useRouteMatch("/users/:id");

  const user = useSelector((state) => {
    if (!routeMatch) return null;

    return state.users.allUsers.find(
      (user) => user.id === routeMatch.params.id
    );
  });

  if (!user) return null;

  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title as="h2">{user.name}</Card.Title>
        <Card.Header as="h5">added blogs</Card.Header>
        <ListGroup variant="flush">
          {user.blogs.length > 0 ? (
            user.blogs.map((blog) => (
              <ListGroup.Item key={blog.id}>
                <Link
                  className="text-decoration-none text-dark"
                  to={`/blogs/${blog.id}`}
                >
                  {blog.title}
                </Link>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item className="text-muted">
              No blogs to show
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default User;
