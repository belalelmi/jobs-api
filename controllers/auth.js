import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import bcrypt from "bcryptjs";
import BadRequestError from "../errors/bad-request.js";

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const tempUser = { name, email, password: hashedPassword };

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all fields");
  }

  const user = await User.create({ ...tempUser });
  console.log(user);
  res.status(StatusCodes.CREATED).json({ user });
});
// @desc    Login a user
// @route   POST /api/v1/auth/login
const login = async (req, res) => {
  res.send("login user");
};

export { register, login };
