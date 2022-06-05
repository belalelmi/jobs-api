import User from "../models/User.js";
import JWT from "jsonwebtoken";
import ayncHandler from "express-async-handler";
import UnauthenticatedError from "../errors/unauthenticated.js";

const authentication = ayncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);

    // console.log(payload);

    req.user = { userID: payload.userID, name: payload.name };

    next();
  } catch (err) {
    throw new UnauthenticatedError("Authentication invalid");
  }
});

export { authentication };
