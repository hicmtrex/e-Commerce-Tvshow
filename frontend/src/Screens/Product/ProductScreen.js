import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import {
  Button,
  Card,
  Row,
  Col,
  Image,
  ListGroup,
  Carousel,
  ListGroupItem,
  Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  createProductReview,
  listProductDetails,
} from '../../redux/actions/productsActions';
import Rating from '../../components/Rating';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../redux/constants/productConstants';
import Meta from '../../components/Meta';

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [ratingStar, setRatingStar] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const createReview = useSelector((state) => state.createReview);
  const { success: sccessProductReview, error: errorProductReview } =
    createReview;

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (sccessProductReview) {
      alert('Review Submitted!');
      setRatingStar(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, sccessProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        ratingStar,
        comment,
      })
    );
  };
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.title} />
          <Row className='mt-2'>
            <Col md={6}>
              <Carousel>
                <Carousel.Item>
                  <Image
                    style={{ height: '350px' }}
                    className='d-block w-100'
                    src={product.imgSm}
                    alt='First slide'
                    fluid
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <Image
                    style={{ height: '350px' }}
                    className='d-block w-100'
                    src={product.img}
                    alt='Second slide'
                    fluid
                  />
                </Carousel.Item>
              </Carousel>
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h3>{product.title}</h3>
                </ListGroupItem>
                <ListGroup.Item>
                  <Rating
                    value={product.ratingStar}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroupItem>Price : ${product.price}</ListGroupItem>
                <ListGroupItem> {product.desc}</ListGroupItem>
                <ListGroupItem>Relased Year : {product.year}</ListGroupItem>
                <ListGroupItem>Genre : {product.genre}</ListGroupItem>
                <ListGroupItem>
                  <Image
                    className='me-2'
                    style={{ width: '50px' }}
                    src='/images/Imdb_logo.png'
                    alt=''
                  />
                  {product.rating}
                </ListGroupItem>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
                <ListGroup variant='flush'>
                  <ListGroupItem>
                    <Row>
                      <Col>Qty {qty}</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>

                <ListGroupItem>
                  <Button
                    onClick={addToCartHandler}
                    className='col-12'
                    type='button'
                  >
                    ADD TO CART
                  </Button>
                </ListGroupItem>
              </Card>
            </Col>
            <Link to={`/watch/${product.id}`}>Watch Trailer </Link>
          </Row>
        </>
      )}

      <Row>
        <Col md={6}>
          <ReactPlayer
            className='video'
            width='100%'
            height='100%'
            url={product?.trailer}
            playing
            muted
            config={{ file: { attributes: { autoPlay: true } } }}
          />
        </Col>
        <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews.length === 0 && <Message>No Reviews</Message>}
          <ListGroup variant='flush'>
            {product.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.ratingStar} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <h3>Write a Review</h3>
              {errorProductReview && (
                <Message variant='danger'>{errorProductReview}</Message>
              )}
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as='select'
                      value={ratingStar}
                      onChange={(e) => setRatingStar(e.target.value)}
                    >
                      <option value=''>Select...</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='comment'>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as='textarea'
                      row='3'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </Form.Group>
                  <Button type='submit' variant='primary' className='mt-2'>
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to='/login'>sign in</Link>
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
