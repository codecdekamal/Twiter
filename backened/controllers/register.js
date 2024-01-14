const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
// registration controller
const register = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    if (!name || !email || !username || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Please provide all the credentials" });
    }
    const saltRounds = 10;
    const myPlainPassword = password;
    const hashedPassword = await bcrypt.hash(myPlainPassword, saltRounds);
    const user = await User.create({ ...req.body, password: hashedPassword });
    const token = jwt.sign(
      {username:user.username,userID:user._id},
      process.env.MY_PRIVATE_KEY,
      { expiresIn: "30d" }
    );
    return res.status(StatusCodes.CREATED).json({
      msg: "You have successfuly registered yourself",
       token,
      user: user,
    });
  } catch (error) {
    const errorCredential = error.keyValue;
    if (errorCredential.username) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: "It is an existing username" });
    } else if (errorCredential.email) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: "It is an existing email" });
    }
    console.log(errorCredential);
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)
    if (!email || !password) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Please provide email and password." });
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "email is not registered", registered: false });
    }
    const verfyingPassword = await bcrypt.compare(password, user.password);
    if (!verfyingPassword) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "please enter the correct password." });
    }
    const token =  jwt.sign({username:user.username,userID:user._id},process.env.MY_PRIVATE_KEY,{expiresIn:"30d"})
      res.status(StatusCodes.OK).json({token,username:user.username,userID:user._id})
  } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Internal sever error!"})
  }
};
module.exports = { register, login };
