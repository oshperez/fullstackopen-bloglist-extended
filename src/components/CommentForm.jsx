import { useState } from "react";
import { addComment } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { Form, FloatingLabel, Button } from "react-bootstrap";

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
    <Form onSubmit={handleSubmit}>
      <FloatingLabel
        controlId="floatingTextarea"
        label="Comments"
        className="mb-3"
      >
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ height: 100 }}
          required
        />
      </FloatingLabel>

      <Button variant="primary" type="submit">
        add
      </Button>
    </Form>
  );
};

export default CommentForm;
