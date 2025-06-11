// const mongoose = require("mongoose");
// const products = require("../data/productData");
// const Product = require("../models/productModel");

// const dbConnect = () => {
//     mongoose.connect("mongodb://127.0.0.1:27017/TechBazar")
//         .then(async () => {
//             console.log("Connected successfully to MongoDB");

//             const existingProducts = await Product.countDocuments();
//             if (existingProducts === 0) {
//                 await Product.insertMany(products);
//                 console.log("Products added to database!");
//             } else {
//                 console.log("Products already exist, skipping insertion.");
//             }
//         })
//         .catch((err) => {
//             console.error("MongoDB Connection Error:", err);
//         });
// };

// module.exports = dbConnect;
const mongoose = require("mongoose");

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }
  try {
   
    const db = await mongoose.connect("mongodb://127.0.0.1:27017/TechBazar");


    isConnected = db.connections[0].readyState === 1;
    console.log("✅ New MongoDB connection established");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    throw err;
  }
};

module.exports = dbConnect;