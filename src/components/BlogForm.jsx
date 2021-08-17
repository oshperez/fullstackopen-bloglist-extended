import blogServices from "../services/blogs";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { addBlogToUser } from "../reducers/userReducer";

import { Form, FloatingLabel, Button } from "react-bootstrap";

const BlogForm = React.forwardRef((props, ref) => {
  // State variable that holds the new blog that will be created
  const [blog, setBlog] = useState({ title: "", author: "", url: "" });

  // Access dispatch function via hooks
  const dispatch = useDispatch();

  // Handles blog submition
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBlog = await blogServices.create(blog);

      // Accesses function via ref to toggle between blog views
      ref.current.toggleVisibility();

      dispatch(createBlog(newBlog));
      
      const {likes, comments, title, author, url, id} = newBlog
      dispatch(addBlogToUser({likes, comments, title, author, url, id}))
      
      dispatch(
        setNotification("success", `new blog ${newBlog.title} added`, 5)
      );

      setBlog({ title: "", author: "", url: "" });
    } catch (error) {
      dispatch(
        setNotification("error", `something went wrong ${error.message}`, 5)
      );
    }
  };

  // Sets up new blog
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel label="Title" className="mb-2">
        <Form.Control
          type="text"
          id="title"
          value={blog.title}
          name="title"
          data-cy="blog-title"
          onChange={(e) => handleChange(e)}
          placeholder="Title"
        />
      </FloatingLabel>
      <FloatingLabel label="Author" className="mb-2">
        <Form.Control
          type="text"
          id="author"
          value={blog.author}
          name="author"
          data-cy="blog-author"
          onChange={(e) => handleChange(e)}
          placeholder="Author"
        />
      </FloatingLabel>
      <FloatingLabel label="Url" className="mb-2">
        <Form.Control
          type="text"
          id="url"
          value={blog.url}
          name="url"
          data-cy="blog-url"
          onChange={(e) => handleChange(e)}
          placeholder="Url"
        />
      </FloatingLabel>

      <Button
        variant="primary"
        className="mb-2"
        type="submit"
        data-cy="blog-submit"
      >
        create
      </Button>
    </Form>
  );
});

export default BlogForm;
