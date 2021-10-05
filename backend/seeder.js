import mongoose from "mongoose";
import movies from "./data/products.js";
import colors from "colors";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import users from "./data/users.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Product.insertMany(movies);
    // await User.insertMany(users)
    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

importData();
