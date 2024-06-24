const authSwagger = require("./authSwagger");
const bookSwagger = require("./bookSwagger");

module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Simple BookStore API Documentation",
    version: "1.0.0",
    description: "Simple BookStore API Documentation",
  },
  components: {
    securitySchemes: {
      Authorization: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        value: "Bearer <JWT token here>",
      },
    },
  },
  paths: {
    ...authSwagger.paths, // Import annotations for notes routes
    ...bookSwagger.paths, // Import annotations for users routes
  },
};
