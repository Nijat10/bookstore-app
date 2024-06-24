const express = require("express");
const app = express();

app.use(express.json());

//Environment
const dotenv = require("dotenv");
dotenv.config({
  path: `./.env.${process.env.NODE_ENV}`,
});

// Routes
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const HttpError = require("./errorHandling/httpError");

// CORS Policy
const cors = require("cors");
app.use(cors());

//Security headers
const helmet = require("helmet");
app.use(helmet());

//Rate limiting
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100, // limit each IP to 100 requests per window
  message: "Rate limit exceeded. Please try again later.",
});
app.use(limiter);

// Swagger
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = require("./documentation/swagger");

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: ["./routes/*.js"], // Specify the path to your route files
});

// API routes
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

//Swagger UI route
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

//Error handling
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An error has occurred" });
});

app.listen(process.env.PORT, process.env.HOST, () =>
  console.log(`Server is listening on ${process.env.PORT}`)
);
