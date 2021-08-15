import React, { useState, useImperativeHandle } from "react";
import { Button } from "react-bootstrap";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <div>
      <Button
        className="mb-3"
        variant="dark"
        disabled={visible ? true : false}
        onClick={() => toggleVisibility()}
        data-cy="toggle-open"
      >
        {props.buttonLabel}
      </Button>

      <Button
        className={`${!visible ? "invisible" : "mb-3 mx-3"}`}
        variant="dark"
        onClick={() => toggleVisibility()}
        data-cy="toggle-closed"
      >
        cancel
      </Button>
      <div className={!visible ? "wrapper--hidden" : ""}>{props.children}</div>
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
