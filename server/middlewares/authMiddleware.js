const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token;

  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "My-Secret-Key");
    req.user = decoded;
    console.log("The decoded user is", req.user);
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" }); 
  }
};

module.exports = verifyToken;