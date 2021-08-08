import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <div className="blog">
      <span>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </span>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
