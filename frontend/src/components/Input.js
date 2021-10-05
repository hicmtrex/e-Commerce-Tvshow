import React from "react";
import { Form } from "react-bootstrap";

const Input = React.forwardRef((props, ref) => {
  return (
    <>
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        ref={ref}
        onChange={props.onChange}
      />
    </>
  );
});

export default Input;
