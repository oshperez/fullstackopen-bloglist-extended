import { useState } from "react";
import CommentForm from "./CommentForm";

const Comments = ({ comments, blogId }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Comments</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "cancel" : "comment"}
      </button>
      {showForm ? <CommentForm blogId={blogId} /> : null}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
