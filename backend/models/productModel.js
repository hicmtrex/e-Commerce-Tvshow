import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    ratingStar: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    imgSm: { type: String, required: true },
    imgTitle: { type: String },
    trailer: { type: String, required: true },
    video: { type: String },
    year: { type: String, required: true },
    limit: { type: Number },
    genre: { type: String, required: true },
    isSeries: { type: Boolean, required: true, default: false },
    rating: { type: Number, required: true },
    ratingStar: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    countInStock: { type: Number },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
