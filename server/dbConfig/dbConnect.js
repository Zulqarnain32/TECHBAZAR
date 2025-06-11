// const mongoose = require("mongoose");

// let isConnected = false;

// const dbConnect = async () => {
//   if (isConnected) {
//     console.log("✅ Using existing MongoDB connection");
//     return;
//   }
//   try {
   
//     const db = await mongoose.connect("mongodb+srv://zulqarnainc67:EmLFmkOiMGjfiMvU@cluster0.ldworfw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
//     isConnected = db.connections[0].readyState === 1;
//     console.log("✅ New MongoDB connection established");
//   } catch (err) {
//     console.error("❌ MongoDB Connection Error:", err);
//     throw err;
//   }
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
    mongoose.set("strictQuery", false);
    mongoose.set("bufferCommands", false); // Avoid buffering delays

    const db = await mongoose.connect(
      "mongodb+srv://zulqarnainc67:EmLFmkOiMGjfiMvU@cluster0.ldworfw.mongodb.net/TechBazar?retryWrites=true&w=majority&appName=Cluster0"
    );

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ New MongoDB connection established");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    throw err;
  }
};

module.exports = dbConnect;

