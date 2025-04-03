const  mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    stock: { type: Number, required: true },
    oldPrice: { type: Number, required: true },
    reviews: { type: Number, required: true },
    off: { type: Number, required: true },
    colors: { type: Array, required: true },
    colorName: { type: Array, required: true },
    gallary: { type: Array, required: true },

});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;