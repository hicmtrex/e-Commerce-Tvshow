import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { register } from "../../redux/actions/userActions";

const RegisterScreen = ({ history, location }) => {
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [redirect, history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    const usernameInpit = usernameRef.current.value;
    const emailInput = emailRef.current.value;
    const passwordInput = passwordRef.current.value;
    const confirmPasswordInput = confirmPasswordRef.current.value;

    if (passwordInput !== confirmPasswordInput) {
      setMessage("Password do not match");
    } else {
      dispatch(register(usernameInpit, emailInput, passwordInput));
    }
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>name</Form.Label>
          <Input type='text' placeholder='Enter username' ref={usernameRef} />
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email adress</Form.Label>
          <Input type='email' placeholder='Enter email' ref={emailRef} />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Input type='password' placeholder='Password' ref={passwordRef} />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Confirm Password</Form.Label>
          <Input
            type='password'
            placeholder='Confirm Password'
            ref={confirmPasswordRef}
          />
        </Form.Group>
        <Button type='submit' className='mt-2'>
          Sign Up
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Have an Account? <Link to='/login'>Sign In</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
