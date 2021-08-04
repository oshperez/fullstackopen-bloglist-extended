import { useEffect } from "react";
import { removeNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

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
    <div
      className={`notification notification__${category}`}
      data-cy="notification"
    >
      <span>{message}</span>
    </div>
  );
};

export default Notification;
