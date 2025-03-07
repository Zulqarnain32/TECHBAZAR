const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usermodel = require("../models/UserModel");

const register = async (req, res) => {
  try {
    console.log("req body ", req.body);
    
    const { username,email, password} = req.body;
    console.log("user data ", username,email,password);
    
    if(!username || !email || !password ){
      return res.json({message:"please fill all the fields"})
    }
    const user = await Usermodel.findOne({ email });
    if(user){
      return res.json({message:"email already exist"})
    }

    
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new Usermodel({ username,email,password:hashPassword });
    await newUser.save();
    res.json({ message: `user ${username} registered` });
  } catch (err) {
    console.log(err);
    
    res.json(err);
  }
};

const login = async (req, res) => {
  console.log("req body ", req.body);
  const { email, password } = req.body;
  if(!email || !password ){
    return res.json({message:"please fill all the fields"})
  }
  const user = await Usermodel.findOne({ email });
  if(!user){
    return res.json({message:"invalid email"})
  }
  const isMatch = await bcrypt.compare(password,user.password);
  if(!isMatch){
    return res.json({message:"incorrect password"})
  }
  const token = jwt.sign({id:user._id,role:user.role,username:user.username,email:user.email},"My-Secret-Key")
  return res.json({message:"sucessfully login",token,role:user.role,username:user.username,email:user.email})
};




module.exports = { register, login };