const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const Usermodel = require("../models/UserModel");
const register = async (req, res) => {
  try {
    console.log("req body ", req.body);
    
    const { username, email, password } = req.body;
    console.log("user data ", username, email, password);
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    // Check if user already exists
    const existingUser = await Usermodel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already exists" });
    }

    // Hash password and save user
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new Usermodel({ username, email, password: hashPassword });
    await newUser.save();

    console.log("user registered");

    return res.status(201).json({ success: true, message: "User registered successfully", user: newUser });

  } catch (err) {
  console.error("❌ Registration Error:", err);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: err.message,
    stack: err.stack, // Add this to see where the error occurred
  });
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
  return res.json({message:"sucessfully login",token,role:user.role,username:user.username,email:user.email,id:user._id})
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Validate email input
  if (!email) {
    return res.json({ message: "Please enter an email" });
  }

  try {
    // Find user by email
    const user = await Usermodel.findOne({ email });
    if (!user) {
      return res.json({ message: "User not registered" });
    }

    // Generate JWT token with expiration time
    const emailToken = jwt.sign({ id: user._id }, "My-Secret-Key", { expiresIn: "1h" });

    // Setup nodemailer transporter
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zulqarnainc67@gmail.com",
        pass: "pniq fonb hius uazc", // Consider using environment variables for security
      },
    });

    // Email details
    var mailOptions = {
      from: "zulqarnainc67@gmail.com",
      to: email, // Send email to the user's provided email
      subject: "Reset Your Password",
      // text: `Click the link to reset your password: http://localhost:5173/resetPassword/${emailToken}`,
      text: `Click the link to reset your password: https://tech-bazaar-frontend.vercel.app/resetPassword/${emailToken}`,
    };

    // Send email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
        return res.json({ message: "Error sending email" });
      } else {
        console.log("Email sent: " + info.response);
        return res.json({ message: "Email sent successfully" });
      }
    });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  console.log("req.params:", req.params);
console.log("Extracted Token:", token);

  console.log("Received Token:", token); // Debugging line

  try {
    const decoded = jwt.verify(token, "My-Secret-Key"); // Remove 'await' (verify is synchronous)
    console.log("Decoded Token:", decoded); // Debugging line

    const id = decoded.id;
    const hashPassword = await bcrypt.hash(password, 10);
    
    await Usermodel.findByIdAndUpdate(id, { password: hashPassword }); // Correct findByIdAndUpdate syntax
    
    return res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};



module.exports = { register, login, forgotPassword, resetPassword };