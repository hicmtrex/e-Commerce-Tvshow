import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// components & Screens
import {
  Header,
  Footer,
  HomeScreen,
  OrderScreen,
  ShippingScreen,
  PaymentScreen,
  PlaceOrderScreen,
  WatchScreen,
  LoginScreen,
  RegisterScreen,
  ProfileScreen,
  ProductScreen,
  CartScreen,
  UserListScreen,
  UserEditScreen,
  ProductListScreen,
  OrderListScreen,
  ProductEditScreen,
} from './components';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/watch' component={WatchScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            exact
            path='/admin/productlist'
            component={ProductListScreen}
          />
          <Route
            exact
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
          />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route exact path='/search/:keyword' component={HomeScreen} />
          <Route exact path='/page/:pageNumber' component={HomeScreen} />
          <Route
            exact
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
          />
          <Route exact path='/' component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
