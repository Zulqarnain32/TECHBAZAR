const express = require("express")
const dbConnect = require("./dbConfig/dbConnect")
const authRoutes = require("./routes/authRoutes")
// const userRoutes = require("./routes/userRoutes")
require("dotenv").config();
const cors = require("cors");
const Usermodel = require("./models/UserModel");

const app = express();
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
// app.use("/api/users",userRoutes)

const PORT = 5000;



app.listen(PORT, () => {
    console.log("server running on port", PORT);
});