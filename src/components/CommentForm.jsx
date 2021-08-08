import { useState } from "react";
import { addComment } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const savedComment = await blogService.addComment(blogId, {
      content: comment,
    });
    dispatch(addComment(blogId, savedComment));
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        rows="5"
        cols="35"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <br />
      <button type="submit">add</button>
    </form>
  );
};

export default CommentForm;
