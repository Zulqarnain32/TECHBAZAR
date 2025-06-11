const express = require("express");
const cors = require("cors");
// require("dotenv").config();

const dbConnect = require("./dbConfig/dbConnect");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoute");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["https://tech-bazaar-frontend.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await dbConnect(); // ⬅️ IMPORTANT: wait for DB connection before anything else

    // Now register routes safely
    app.use("/api/auth", authRoutes);
    app.use("/api/products", productRoutes);

    app.get("/", (req, res) => {
      res.send("backend is working");
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
