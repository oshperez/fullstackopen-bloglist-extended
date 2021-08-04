import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";

const rootReducer = combineReducers({
  blogs: blogReducer,
  users: userReducer,
  notification: notificationReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
