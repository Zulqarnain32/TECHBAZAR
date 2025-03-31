const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  googleId: {
    type: String,
  },
  displayName: {
    type: String,
  },

  image: {
    type: String,
  },
  role: { type: String, default: "user", enum: ["admin", "manager", "user"] },
  cart: {
    type: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String },
        price: { type: Number },
        rating: { type: String },
        category: { type: String },
        image: { type: String },
        stock: { type: Number },
        oldPrice: { type: Number },
        reviews: { type: Number },
        off: { type: Number },
        colors: { type: Array },
        colorName: { type: Array },
        gallary: { type: Array },
      },
    ],
    default: [],
  },
  favorites: {
    type: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String },
        price: { type: Number },
        rating: { type: String },
        category: { type: String },
        image: { type: String },
        stock: { type: Number },
      },
    ],
    default: [],
  },
});

const UserModel = mongoose.model("UserModel", userSchema);
module.exports = UserModel;
