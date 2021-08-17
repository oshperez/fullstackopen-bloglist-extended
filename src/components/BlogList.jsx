import { useSelector, useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { setNotification } from "../reducers/notificationReducer";
import { addLikes, deleteBlog } from "../reducers/blogReducer";
import blogServices from "../services/blogs";

import Blog from "../components/Blog";
import BlogDetails from "../components/BlogDetails";

import { ListGroup } from "react-bootstrap";

const BlogList = ({ blogForm }) => {
  const blogs = useSelector((state) => state.blogs);
  const loggedInUser = useSelector((state) => state.users.loggedInUser);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleAddLikes = async (id, alreadyLiked) => {
    try {
      const targetBlog = blogs.find((blog) => blog.id === id);
      const replacement = alreadyLiked
        ? {
            ...targetBlog,
            likes: targetBlog.likes.filter((id) => id !== loggedInUser.id),
          }
        : { ...targetBlog, likes: [...targetBlog.likes, loggedInUser.id] };


      const updatedBlog = await blogServices.update(replacement);
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
      history.push("/");
    }
  };

  return (
    <Switch>
      <Route path="/blogs/:id">
        <BlogDetails
          user={loggedInUser}
          addLikes={handleAddLikes}
          deleteBlog={handleDeleteBlog}
        />
      </Route>
      <Route path="/">
        <ListGroup variant="flush" className="my-3" data-cy="blog-container">
          {blogs
            .sort((blog1, blog2) => blog2.likes - blog1.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={loggedInUser}
                addLikes={handleAddLikes}
                deleteBlog={handleDeleteBlog}
              />
            ))}
        </ListGroup>
        {blogForm()}
      </Route>
    </Switch>
  );
};

export default BlogList;
