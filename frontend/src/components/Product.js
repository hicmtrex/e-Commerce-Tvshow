import React from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "react-bootstrap";

export default function Product({ product }) {
  return (
    <Card
      className='my-3 p-2 rounded'
      style={{ height: "400px", border: "solid 0.5px #32fbe2" }}
    >
      <Link to={`product/${product._id}`}>
        <Card.Img
          src={product.imgSm}
          variant='top'
          style={{ height: "200px" }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='h5'>
            <strong>{product.title}</strong>
          </Card.Title>
        </Link>
      </Card.Body>
      <Card.Text as='div'>
        Type : {product.isSeries ? "Series" : "Movie"}
      </Card.Text>
      <Card.Text as='div'> Genre : {product.genre} </Card.Text>
      <Card.Text as='div'>
        <div className='mb-3'>
          <Image
            rounded
            fluid
            style={{ width: "50px", marginRight: "10px" }}
            src='/images/Imdb_logo.png'
            alt=''
          />
          {"   "}
          {product.rating}
        </div>
      </Card.Text>
      <Card.Text as='h3'>${product.price}</Card.Text>
    </Card>
  );
}
