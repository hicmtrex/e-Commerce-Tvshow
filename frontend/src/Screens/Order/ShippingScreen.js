import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CheckoutSteps from "../../components/CheckoutSteps";
import FormContainer from "../../components/FormContainer";
import Input from "../../components/Input";
import { saveShippingAddress } from "../../redux/actions/cartActions";

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Input
            type='text'
            placeholder='Enter Address'
            onChange={(e) => setAddress(e.target.value)}
            required
            value={address}
          />
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Input
            type='text'
            placeholder='Enter City'
            onChange={(e) => setCity(e.target.value)}
            required
            value={city}
          />
        </Form.Group>
        <Form.Group controlId='codePostal'>
          <Form.Label>Code Postal</Form.Label>
          <Input
            type='text'
            placeholder='Enter Code Postal'
            onChange={(e) => setPostalCode(e.target.value)}
            required
            value={postalCode}
          />
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Input
            type='text'
            placeholder='Enter Country'
            onChange={(e) => setCountry(e.target.value)}
            required
            value={country}
          />
        </Form.Group>
        <Button className='mt-3' type='submit'>
          Continune
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
