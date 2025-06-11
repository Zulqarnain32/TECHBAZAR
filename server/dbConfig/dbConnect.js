const mongoose = require("mongoose");

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }
  try {
   
    // const db = await mongoose.connect("mongodb://127.0.0.1:27017/TechBazar");

    const db = await mongoose.connect("mongodb+srv://zulqarnainc67:EmLFmkOiMGjfiMvU@cluster0.ldworfw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");


    isConnected = db.connections[0].readyState === 1;
    console.log("✅ New MongoDB connection established");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    throw err;
  }
};

module.exports = dbConnect;

