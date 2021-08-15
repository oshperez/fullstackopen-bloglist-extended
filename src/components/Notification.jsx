import { useEffect } from "react";
import { removeNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = ({ notification: { category, message, delay } }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutID = setTimeout(
      () => dispatch(removeNotification()),
      delay * 1000
    );
    return () => clearTimeout(timeoutID);
  }, [dispatch, delay]);

  return (
    <Alert className="m-0"
      variant={
        category === "success"
          ? "success"
          : category === "error"
          ? "danger"
          : "info"
      }
      data-cy="notification"
    >
      {message}
    </Alert>
  );
};

export default Notification;
