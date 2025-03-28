const express = require("express")
const app = express();
const dbConnect = require("./dbConfig/dbConnect")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const cartRoutes = require("./routes/cartRoutes")
const productRoute = require("./routes/productRoute")
const favoriteRoutes = require("./routes/favoriteRoutes")
const cors = require("cors");
const Usermodel = require("./models/UserModel");

require("dotenv").config();
dbConnect()

app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173"],
    method:['GET','POST','PUT','DELETE'],
    credentials:true
}))

app.get("/dashboard", async (req, res) => {
    try {
        const users = await Usermodel.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.use("/api/auth",authRoutes)
app.use("/api/cart", cartRoutes);
app.use("/api/users",userRoutes)
app.use("/api/products", productRoute);
app.use("/api/favorites", favoriteRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log("server running on port", PORT);
});