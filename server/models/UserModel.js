const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        default:"user",
        enum:["admin","manager","user"]
    },
    
})

const Usermodel = new mongoose.model("UserModel",userSchema);
module.exports = Usermodel