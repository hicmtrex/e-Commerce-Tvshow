import React, { useEffect, useRef } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { login } from "../../redux/actions/userActions";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error, loading } = userLogin;
  const emailRef = useRef();
  const passwordRef = useRef();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    const emailInput = emailRef.current.value;
    const passwordInput = passwordRef.current.value;
    dispatch(login(emailInput, passwordInput));
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email adress</Form.Label>
          <Input type='email' placeholder='Enter email' ref={emailRef} />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Input type='password' placeholder='Password' ref={passwordRef} />
        </Form.Group>
        <Button className='mt-3' type='submit'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer? <Link to='/register'>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
