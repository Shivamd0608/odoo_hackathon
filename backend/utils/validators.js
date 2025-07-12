const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (plainText) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainText, salt);
};

const comparePassword = async (plainText, hashed) => {
  return await bcrypt.compare(plainText, hashed);
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
};
