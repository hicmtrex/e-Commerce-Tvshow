import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Image } from "react-bootstrap";
import { listTopProduct } from "../../redux/actions/productsActions";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productTopRated
  );

  useEffect(() => {
    dispatch(listTopProduct());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div>
      <Carousel id='carousel' pause='hover'>
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image src={product.img} alt={product.title} fluid />
              <Carousel.Caption className='carousel-caption'>
                <h2 style={{ color: "#32fbe2" }}>
                  {product.title} $({product.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
