import { useSelector, useDispatch } from "react-redux";
import { addLikes, deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import blogServices from "../services/blogs";
import Blog from "../components/Blog";

const BlogList = (props) => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const handleAddLikes = async (id) => {
    try {
      const targetBlog = blogs.find((blog) => blog.id === id);

      const updatedBlog = await blogServices.update({
        ...targetBlog,
        likes: (targetBlog.likes += 1),
      });

      dispatch(addLikes(updatedBlog));
    } catch (error) {
      dispatch(setNotification("error", `${error.message}`, 5));
    }
  };

  const handleDeleteBlog = async (id) => {
    const targetBlog = blogs.find((blog) => blog.id === id);

    if (
      window.confirm(`Remove blog ${targetBlog.title} by ${targetBlog.author}?`)
    ) {
      try {
        await blogServices.deleteBlog(targetBlog.id);
        dispatch(deleteBlog(targetBlog.id));

        dispatch(
          setNotification("success", `blog ${targetBlog.title} deleted`, 5)
        );
      } catch (error) {
        dispatch(
          setNotification("error", `deletion failed ${error.message}`, 5)
        );
      }
    }
  };

  return (
    <div data-cy="blog-container">
      {blogs
        .sort((blog1, blog2) => blog2.likes - blog1.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLikes={handleAddLikes}
            deleteBlog={handleDeleteBlog}
          />
        ))}
    </div>
  );
};

export default BlogList;
