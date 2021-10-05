import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});
// @desc Fetch signle product
// @route GET/ api/product/:id signle product
// @access Public

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Delete a product
// @route Delete /api/products/:id
// @access Private/admin

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Create a product
// @route Post /api/products
// @access Private/admin

export const createProduct = asyncHandler(async (req, res) => {
  const product = await new Product({
    title: "Sample Title",
    price: 0,
    user: req.user._id,
    img: "/images/inception_main.jpg",
    imgSm: "/images/inception_main.jpg",
    desc: "Sample Descrption",
    trailer: "images/Inception  Official Trailer #1 - Christopher Nolan.mp4",
    genre: "Action",
    countInStock: 10,
    rating: 5.5,
    year: "2000",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc Fetch signle product
// @route GET/ api/product/:id signle product
// @access Public

export const updateProduct = asyncHandler(async (req, res) => {
  const {
    title,
    price,
    img,
    imgSm,
    desc,
    trailer,
    year,
    genre,
    countInStock,
    rating,
    isSeries,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    (product.title = title),
      (product.price = price),
      (product.desc = desc),
      (product.img = img),
      (product.imgSm = imgSm),
      (product.trailer = trailer),
      (product.genre = genre),
      (product.countInStock = countInStock),
      (product.rating = rating),
      (product.year = year);
    product.isSeries = isSeries;
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
  const updatedProduct = await product.save();
  res.status(201).json(updatedProduct);
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private

export const createProductReview = asyncHandler(async (req, res) => {
  const { ratingStar, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      ratingStar: Number(ratingStar),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.ratingStar =
      product.reviews.reduce((acc, item) => item.ratingStar + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Get top rated Products
// @route   POST /api/products/top
// @access  Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.aggregate([{ $sample: { size: 5 } }]);
  res.json(products);
});
