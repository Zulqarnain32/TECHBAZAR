const express = require("express");
const User = require("../models/UserModel");
const Product = require("../models/productModel");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/add", async (req, res) => {
  console.log("favorite add hit");

  try {
    const { userId, productId } = req.body;

    console.log("Received User ID:", userId);
    console.log("Received Product ID:", productId);

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "User ID and Product ID are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(productId);
    console.log(product);
    if (!product) {
      console.log("not product found");
      return res.status(404).json({ message: "Product not found" });
    }

    const existingProduct = user.favorites.find(
      (item) => item.productId.toString() === productId
    );

    if (existingProduct) {
      console.log("already exist")
      existingProduct.quantity += 0; //   if item already exists
      user.save()
      return res.json({message:"product already exist",favorites: user.favorites})
    } else {
      user.favorites.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        stock: product.stock,
        image:product.image,
        // category: product.category,
        // description: product.description,
        // rating:product.rating,
        // oldPrice:product.oldPrice,
        // reviews:product.reviews,
        // gallary:product.gallary,
        // colorName:product.colorName,
        // colors:product.colors
      });
    }

    await user.save();
    res.json({
      message: "Product added",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Error adding to favorite:", error);
    res.status(500).json({ message: "Server error" });
  }
});



router.get("/userfavorite/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ favorites: user.favorites });
  } catch (err) {
    console.log("Error fetching user cart:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// remove product from user Schema
router.delete("/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid User ID or Product ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter out the product from the cart
    user.favorites = user.favorites.filter(item => item.productId.toString() !== productId);

    await user.save();
    res.json({ message: "Product removed from favorite", favorites: user.favorites });
  } catch (error) {
    console.error("Error removing from favorite:", error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;