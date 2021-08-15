import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { X, Dash } from "react-bootstrap-icons";

const Blog = ({ blog, deleteBlog, user }) => {
  const deleteActive = blog.user.username === user.username;
  
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <Link className="text-dark text-decoration-none" to={`/blogs/${blog.id}`}>
        {blog.title}
      </Link>
      {deleteActive ? (
        <X size={23} className="hover-danger" onClick={() => deleteBlog(blog.id)} />
      ) : (
        <Dash size={23} className="text-muted text-light" />
      )}
    </ListGroup.Item>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
