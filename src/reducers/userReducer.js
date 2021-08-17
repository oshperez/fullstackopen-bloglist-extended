const initialState = {
  allUsers: [],
  loggedInUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "users/init":
      return { ...state, allUsers: action.payload };
    case "user/addBlog":
      const newBlog = action.payload;
      const target = state.allUsers.find(
        (user) => user.username === state.loggedInUser.username
      );
      const updatedUser = { ...target, blogs: [...target.blogs, newBlog] };
      return {
        ...state,
        allUsers: [
          ...state.allUsers.filter(
            (user) => user.username !== state.loggedInUser.username
          ),
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
    type: "user/addBlog",
    payload: blog,
  };
};

export default userReducer;
