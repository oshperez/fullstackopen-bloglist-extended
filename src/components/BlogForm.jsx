import blogServices from "../services/blogs";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const BlogForm = React.forwardRef((props, ref) => {
  // State variable that holds the new blog that will be created
  const [blog, setBlog] = useState({ title: "", author: "", url: "" });

  // Access dispatch function via hooks
  const dispatch = useDispatch()

  // Handles blog submition
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newBlog = await blogServices.create(blog);
      
      // Accesses function via ref to toggle between blog views
      ref.current.toggleVisibility();
      
      dispatch(createBlog(newBlog));
      dispatch(setNotification("success", `new blog ${newBlog.title} added`, 5));
    
      setBlog({ title: "", author: "", url: "" });
    } catch (error) {
      dispatch(setNotification("error", `something went wrong ${error.message}`, 5));
    }
  };

  // Handles new blog setup
  const handleBlogSetup = (e) => {
    const { name, value } = e.target;
    setBlog((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          type="text"
          id="title"
          value={blog.title}
          name="title"
          data-cy="blog-title"
          onChange={(e) => handleBlogSetup(e)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          id="author"
          value={blog.author}
          name="author"
          data-cy="blog-author"
          onChange={(e) => handleBlogSetup(e)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          id="url"
          value={blog.url}
          name="url"
          data-cy="blog-url"
          onChange={(e) => handleBlogSetup(e)}
        />
      </div>
      <button type="submit" data-cy="blog-submit">create</button>
    </form>
  );
})



export default BlogForm;
