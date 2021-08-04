const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "blogs/init":
      return action.payload;
    case "blogs/createBlog":
      return [...state, action.payload];
    case "blogs/deleteBlog":
      const deletedBlogId = action.payload;
      const filteredBlogs = state.filter((blog) => blog.id !== deletedBlogId);
      return filteredBlogs;
    case "blogs/addLikes":
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    default:
      return state;
  }
};

export const initializeBlogs = (blogs) => {
  return {
    type: "blogs/init",
    payload: blogs,
  };
};

export const createBlog = (blog) => {
  return {
    type: "blogs/createBlog",
    payload: blog,
  };
};

export const deleteBlog = (id) => {
  return {
    type: "blogs/deleteBlog",
    payload: id,
  };
};

export const addLikes = (updatedBlog) => {
  return {
    type: "blogs/addLikes",
    payload: updatedBlog,
  };
};

export default blogReducer;
