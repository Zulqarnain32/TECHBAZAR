const express = require("express")
const dbConnect = require("./dbConfig/dbConnect")
const authRoutes = require("./routes/authRoutes")
// const userRoutes = require("./routes/userRoutes")
require("dotenv").config();
const cors = require("cors")

const app = express();
dbConnect()


app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173"],
    method:['GET','POST','PUT','DELETE'],
    credentials:true
}))
app.use("/api/auth",authRoutes)
// app.use("/api/users",userRoutes)

const PORT = 5000;

app.listen(PORT, () => {
    console.log("server running on port", PORT);
});