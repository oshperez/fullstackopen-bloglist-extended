const initialState = {
  allUsers: [],
  loggedInUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "users/init":
      return { ...state, allUsers: action.payload };
    case "user/addOrRemoveBlog":
      const target = state.allUsers.find(
        (user) => user.username === state.loggedInUser.username
      );
      let updatedUser;
      switch (action.meta) {
        case "add":
          const newBlog = action.payload;
          updatedUser = {
            ...target,
            blogs: [...target.blogs, newBlog],
          };
          break;
        case "remove":
          const blogId = action.payload;
          updatedUser = {
            ...target,
            blogs: target.blogs.filter((blog) => blog.id !== blogId),
          };
          break;
        default:
          return state
      }
      return {
        ...state,
        allUsers: [
          ...state.allUsers.filter((user) => user.username !== target.username),
          updatedUser,
        ],
      };

    case "user/login":
      return { ...state, loggedInUser: action.payload };
    case "user/logout":
      return { ...state, loggedInUser: null };
    default:
      return state;
  }
};

export const initializeUsers = (users) => {
  return {
    type: "users/init",
    payload: users,
  };
};

export const loginUser = (user) => {
  return {
    type: "user/login",
    payload: user,
  };
};

export const logoutUser = () => {
  return {
    type: "user/logout",
  };
};

export const addBlogToUser = (blog) => {
  return {
    type: "user/addOrRemoveBlog",
    payload: blog,
    meta: "add",
  };
};

export const removeBlogFromUser = (blogId) => {
  return {
    type: "user/addOrRemoveBlog",
    payload: blogId,
    meta: "remove",
  };
};
export default userReducer;
