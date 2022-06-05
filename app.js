import "express-async-errors";
// import path from 'path'
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import express, { json } from "express";

//connectDB
import connectDB from "./db/connect.js";
// routers
import authRouter from "./routes/auth.js";
import jobsRouter from "./routes/jobs.js";
// error handler
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import { authentication } from "./middleware/authentication.js";

dotenv.config();

connectDB();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(json());
// extra packages

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authentication, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

app.listen(
  port,
  console.log(
    colors.yellow(
      `Server running in ${process.env.NODE_ENV} mode on port: ${port}`
    )
  )
);
