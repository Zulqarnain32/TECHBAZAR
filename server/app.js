const express = require("express");
const cors = require("cors");
const dbConnect = require("./dbConfig/dbConnect")
const authRoutes = require("./routes/authRoutes")
const cartRoutes = require("./routes/cartRoutes")
const productRoute = require("./routes/productRoute")
const favoriteRoutes = require("./routes/favoriteRoutes")
const adminRoutes = require("./routes/adminRoutes")

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["https://tech-bazaar-frontend.vercel.app"],
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
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
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
