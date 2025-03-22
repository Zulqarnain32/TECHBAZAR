const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, default: "user", enum: ["admin", "manager", "user"] },
    cart: { type: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        image: String,
        quantity: Number
    }], default: [] }
});

const UserModel = mongoose.model("UserModel", userSchema);
module.exports = UserModel;
