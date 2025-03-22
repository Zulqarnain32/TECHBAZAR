const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("../models/UserModel");

const router = express.Router();

// Add to Cart Route
router.post("/add-to-cart", async (req, res) => {
    console.log("API HIT: Add to Cart");

    try {
        const { userId, product } = req.body;
        console.log("Received userId:", userId);
        console.log("Received product:", product);

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        // Find the user
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log("User found:", user);

        // Check if product already exists in cart
        const existingProduct = user.cart.find((item) => 
            item.productId.toString() === product.productId
        );

        if (existingProduct) {
            return res.status(400).json({ error: "Product already in cart" });
        }

        // Add product to cart
        user.cart.push({
            productId: new mongoose.Types.ObjectId(product.productId), // Ensure ObjectId format
            name: product.name,
            price: product.price,
            image: product.image,
            rating:product.rating,
            oldPrice:product.oldPrice,
            off:product.off,
            reviews:product.reviews,
            quantity: product.quantity || 1, 
            colorName:product.colorName

        });
        

        await user.save();
        console.log("Cart updated:", user.cart);

        res.status(200).json({ message: "Product added to cart", cart: user.cart });

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
