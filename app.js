import "express-async-errors";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import express, { json } from "express";

// extra security packages
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";

//connectDB
import connectDB from "./db/connect.js";
// routers
import authRouter from "./routes/auth.js";
import jobsRouter from "./routes/jobs.js";
// error handlers
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import { authentication } from "./middleware/authentication.js";

dotenv.config();

// Swagger
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
const swaggerDocument = YAML.load("./swagger.yaml");

connectDB();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);


// mounting the specified middleware functions
app.use(json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send(`<h1>Jobs API</h1>
  <a href="/api-docs">API Documentation</a>`);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authentication, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(
    colors.yellow(
      `Server running in ${process.env.NODE_ENV} mode on port: ${port}`
    )
  )
);
