import { StatusCodes } from "http-status-codes";

// this function is used to handle errors
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong",
  };

  if (err.code && err.code === 11000) {
    customError.message = `Duplicate field value: ${Object.keys(
      err.keyValue
    )}, please try another value`; // set custom error message
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "CastError") {
    customError.message = `No record with ${err.path}: ${err.value._id} found. Please try another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.message });
};

export default errorHandlerMiddleware;
