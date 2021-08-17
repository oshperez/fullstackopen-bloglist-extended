import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { Card, Badge } from "react-bootstrap";
import {
  HandThumbsUp,
  HandThumbsUpFill,
  Trash,
  Link45deg,
} from "react-bootstrap-icons";

const BlogDetails = ({ user, addLikes, deleteBlog }) => {
  const match = useRouteMatch("/blogs/:id");
  const blog = useSelector((state) => {
    return match
      ? state.blogs.find((blog) => blog.id === match.params.id)
      : null;
  });

  if (!blog) return null;

  const isAlredyLikedByUser = blog.likes.some((id) => id === user.id);
  const isDeletionAllow = blog.user.username === user.username;

  return (
    <Card className="flex-container mt-3" style={{ minWidth: "80vw" }}>
      <Card.Body>
        <Card.Title as="h2">{blog.title}</Card.Title>
        <Card.Subtitle as="h5">written by {blog.author}</Card.Subtitle>
        <Card.Link href={`${blog.url}`} className="text-decoration-none">
          {blog.url}
          <Link45deg size={20} />
        </Card.Link>
        <Card className="mt-2 mb-4 border-0">
          <Card.Body className="d-flex bg-light p-2">
            {isAlredyLikedByUser ? (
              <HandThumbsUpFill
                className="text-primary y mx-1"
                size="25"
                onClick={() => addLikes(blog.id, isAlredyLikedByUser)}
              />
            ) : (
              <HandThumbsUp
                className="mx-1"
                size="25"
                onClick={() => addLikes(blog.id, isAlredyLikedByUser)}
              />
            )}{" "}
            <Badge pill className="mx-1 py-2" bg="secondary">
              {blog.likes.length}
            </Badge>
            {isDeletionAllow ? (
              <Trash
                className="ms-auto me-3 hover-danger"
                size={26}
                onClick={() => deleteBlog(blog.id)}
              />
            ) : (
              <Trash className="ms-auto me-3 text-muted" size={26} />
            )}
          </Card.Body>
        </Card>
        <CommentForm blogId={blog.id} />
      </Card.Body>
      <Comments comments={blog.comments} blogId={blog.id} />
    </Card>
  );
};

export default BlogDetails;
