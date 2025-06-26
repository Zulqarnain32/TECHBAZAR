const express = require("express");
const cors = require("cors");
const dbConnect = require("./dbConfig/dbConnect")
const authRoutes = require("./routes/authRoutes")
const cartRoutes = require("./routes/cartRoutes")
const productRoute = require("./routes/productRoute")
const favoriteRoutes = require("./routes/favoriteRoutes")
const adminRoutes = require("./routes/adminRoutes")
const Usermodel = require("./models/UserModel")
const mongoose = require("mongoose")

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["https://tech-bazaar-frontend.vercel.app"],
    // origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const PORT =  5000;

const startServer = async () => {
  try {
    await dbConnect(); // ⬅️ IMPORTANT: wait for DB connection before anything else

    // Now register routes safely
    app.use("/api/auth", authRoutes);
    app.use("/api/products", productRoute);
    app.use("/api/cart", cartRoutes);
    app.use("/api/favorites", favoriteRoutes);
    app.use("/api/admin", adminRoutes);


    app.get("/", (req, res) => {
      res.send("backend is working");
    });



    app.get("/dashboard", async (req, res) => {
    try {
        const users = await Usermodel.find({});
        console.log("users ",users)
        res.json(users);
    } catch (error) {
      console.log("erorr fetching user", error)
        res.status(500).json({ error: "Internal Server Error" });
    }
});






app.get("/orders/:userId", async (req, res) => {
  console.log("API hit: fetching user orders");

  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const user = await Usermodel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ orders: user.userOrders }); // assuming orders are saved in user.orders
  } catch (err) {
    console.log("Error fetching user orders:", err);
    res.status(500).json({ message: "Server error" });
  }
});

 










    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Server failed to start:", err.message);
    process.exit(1); // exit if DB connection fails
  }
};

startServer(); // ⬅️ Starts the async flow
