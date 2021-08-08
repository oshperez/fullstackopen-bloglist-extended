import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import Comments from "./Comments";

const BlogDetails = ({ addLikes, deleteBlog }) => {
  const match = useRouteMatch("/blogs/:id");
  const blog = useSelector((state) => {
    return match
      ? state.blogs.find((blog) => blog.id === match.params.id)
      : null;
  });

  if (!blog) return null;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>{blog.title}</h1>
      <div>
        <a href="#">{blog.url}</a>
      </div>
      <span>
        likes {blog.likes} {}
        <button onClick={() => addLikes(blog.id)}>like</button>
      </span>
      <p>added by {blog.author}</p>
      <button
        onClick={() => deleteBlog(blog.id)}
        className="button button__blue"
      >
        delete
      </button>
      <Comments comments={blog.comments} blogId={blog.id} />
    </div>
  );
};

export default BlogDetails;
