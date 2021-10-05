import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import {
  listProductDetails,
  updateProduct,
} from "../../redux/actions/productsActions";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { PRODUCT_UPDATE_RESET } from "../../redux/constants/productConstants";
import axios from "axios";

const ProductEditScreen = ({ history, match }) => {
  const productId = match.params.id;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState("");
  const [imgSm, setImgSm] = useState("");
  const [trailer, setTrailer] = useState("");
  const [genre, setGenre] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [desc, setDesc] = useState("");
  const [year, setYear] = useState(0);
  const [rating, setRating] = useState(0);
  const [isSeries, setIsSeries] = useState(false);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.title || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setTitle(product.title);
        setPrice(product.price);
        setImg(product.img);
        setImgSm(product.imgSm);
        setGenre(product.genre);
        setCountInStock(product.countInStock);
        setDesc(product.desc);
        setYear(product.year);
        setTrailer(product.trailer);
        setRating(product.rating);
        setIsSeries(product.isSeries);
      }
    }
  }, [product, productId, dispatch, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        title,
        price,
        img,
        imgSm,
        genre,
        desc,
        countInStock,
        rating,
        trailer,
        year,
        isSeries,
      })
    );
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImgSm(data);
      setUploading(false);
      console.log(data);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImg(data);
      setUploading(false);
      console.log(data);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            {/* IMAGE SM */}
            <Form.Group controlId='imgsm'>
              <Form.Label>Image Sm</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter img sm url'
                value={imgSm}
                onChange={(e) => setImgSm(e.target.value)}
              />
              <Form.File
                id='image-file'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            {/* IMG  */}
            <Form.Group controlId='img'>
              <Form.Label>Image Url</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image'
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
              <Form.File
                id='image-file'
                custom
                onChange={uploadImage}
              ></Form.File>
            </Form.Group>

            <Form.Group controlId='trailer'>
              <Form.Label>Trailer</Form.Label>
              <Form.Control
                type='text'
                placeholder='Tailer Url'
                value={trailer}
                onChange={(e) => setTrailer(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='genre'>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Genre'
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='year'>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Year'
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='rating'>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Raring'
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='desc'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                as='textarea'
                row='3'
                placeholder='Enter Description'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='position-relative mt-2'>
              <Form.Check
                required
                checked={isSeries}
                label='Is Series?'
                onChange={(e) => setIsSeries(e.target.checked)}
              />
            </Form.Group>
            <Button type='submit' className='mt-3'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
