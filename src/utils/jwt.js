// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const secretKey = process.env.JWT_SECRET;

// const generateToken = (user) => {
//   const payload = {
//     id: user.id,
//     username: user.username,
//     position: user.position
//   };

//   const signOptions = {
//     expiresIn: "1d", 
//   };

//   return jwt.sign(payload, secretKey, signOptions);
// };

// const generateTokenPassword = (user) => {
//   const payload = {
//     id: user.id,
//     username: user.username,
//   };

//   const signOptions = {
//     expiresIn: "1h",  
//   };

//   return jwt.sign(payload, secretKey, signOptions);
// };

// module.exports = {
//   generateToken,
//   generateTokenPassword,
// };