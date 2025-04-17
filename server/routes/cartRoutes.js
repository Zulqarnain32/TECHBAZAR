const express = require("express");
const User = require("../models/UserModel");
const Product = require("../models/productModel");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/add", async (req, res) => {
  console.log("cart add hit");

  try {
    const { userId, productId } = req.body;

    console.log("Cart Received User ID:", userId);
    console.log("Cart Received Product ID:", productId);

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
    // console.log(product);
    if (!product) {
      console.log("not product found");
      return res.status(404).json({ message: "Product not found" });
    }

    const existingProduct = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1; // Increase quantity if item already exists
      console.log("quantity ", existingProduct.quantity)
      user.save()
      return res.json({message:"product already exist",cart: user.cart})
    } else {
      user.cart.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        category: product.category,
        description: product.description,
        stock: product.stock,
        rating:product.rating,
        oldPrice:product.oldPrice,
        image:product.image,
        reviews:product.reviews,
        gallary:product.gallary,
        colorName:product.colorName,
        colors:product.colors
      });
    }

    await user.save();
    res.json({
      message: "Product added",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/usercart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ cart: user.cart });
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
    user.cart = user.cart.filter(item => item.productId.toString() !== productId);

    await user.save();
    res.json({ message: "Product removed from cart", cart: user.cart });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// increment the quantity 
router.put("/increase", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid User ID or Product ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItem = user.cart.find(item => item.productId.toString() === productId);
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cartItem.quantity += 1; // Increment quantity
    await user.save();

    res.json({ message: "Quantity increased", cart: user.cart });
  } catch (error) {
    console.error("Error increasing quantity:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// decrement the quantity 
router.put("/decrease", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid User ID or Product ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItem = user.cart.find(item => item.productId.toString() === productId);
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    

  if(cartItem.quantity > 1){
    cartItem.quantity -= 1; // decrement quantity
    await user.save();
  }

    res.json({ message: "Quantity decreased", cart: user.cart });
  } catch (error) {
    console.error("Error decreasing quantity:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/data", async (req, res) => {
  try {
    const { userId } = req.body;
    const { whatsApp,address } = req.body; 
    console.log("address ",address)
    console.log("whatsapp ",whatsApp)
    console.log("user whatsapp id ", userId)

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID or Product ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      console.log("userrrr found")
      user.whatsApp = whatsApp;
      user.address = address;
      await user.save()
    }

    res.json({ message: "whatsapp fetched", whatsApp:user.whatsApp });
  } catch (error) {
    console.error("Error fetching whatsapp or address:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Example Express route in Node.js
router.post('/checkout', async (req, res) => {
  const { userId, cart, totalPrice, whatsApp, address } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new order object
    const newOrder = {
      cart,
      totalPrice,
      whatsApp,
      address,
      orderDate: new Date()
    };

    // Push new order into the user's order array
    user.userOrders.push({
      cart,
      totalPrice,
      whatsApp,
      address,
      orderDate: new Date()
    });

    user.cart = [];
    await user.save();

    res.status(201).json({ message: "Order placed successfully!" });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ message: "Server error while placing order." });
  }
});




module.exports = router;