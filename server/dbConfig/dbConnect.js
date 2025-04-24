const mongoose = require("mongoose");
const products = require("../data/productData");
const Product = require("../models/productModel");

const dbConnect = () => {
    // mongoose.connect("mongodb+srv://zulqarnainc67:8edFlYCAniXGuPQY@cluster0.rh2svnp.mongodb.net/")
    mongoose.connect("mongodb://127.0.0.1:27017/TechBazar")
        .then(async () => {
            console.log("Connected successfully to MongoDB");

            const existingProducts = await Product.countDocuments();
            if (existingProducts === 0) {
                await Product.insertMany(products);
                console.log("Products added to database!");
            } else {
                console.log("Products already exist, skipping insertion.");
            }
        })
        .catch((err) => {
            console.error("MongoDB Connection Error:", err);
        });
};

module.exports = dbConnect;