import { Card, ListGroup } from "react-bootstrap";

const Comments = ({ comments }) => {
  return (
    <Card className="m-3" style={{minWidth: "40%"}}>
      <Card.Header as="h5">Comments</Card.Header>
      <Card.Body>
        {comments.length > 0 ? (
          <ListGroup variant="flush">
            {comments.map((comment) => (
              <ListGroup.Item key={comment.id}>
                {comment.content}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <Card.Text className="text-muted">No comments yet</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default Comments;
