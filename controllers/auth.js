import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import UnauthenticatedError from "../errors/unauthenticated.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new BadRequestError("User already exists");
  }

  const user = await User.create({ name, email, password });
  // console.log(user);

  if (user) {
    res.status(StatusCodes.CREATED).json({
      success: true,
      user: {
        name: user.name,
      },
      token: generateToken(user._id),
    });
  } else {
    throw new BadRequestError("User could not be created");
  }
});

// @desc    Login a user
// @route   POST /api/v1/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all fields");
  }
  const user = await User.findOne({ email });
  if (user && (await user.matchesPassword(password))) {
    res.status(StatusCodes.OK).json({
      success: true,
      user: {
        name: user.name,
      },
      token: generateToken(user._id),
    });
  } else {
    throw new UnauthenticatedError("Invalid credentials");
  }
});

export { register, login };
