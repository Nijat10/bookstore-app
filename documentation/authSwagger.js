// Swagger annotations for users route
module.exports = {
  paths: {
    "/api/auth/login": {
      post: {
        tags: ["Auth route"],
        summary: "Authenticate a user",
        description:
          "Authenticate a user by checking their username and password.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Logged in successfully",
          },
          401: {
            description: "Unauthorized, invalid credentials",
          },
        },
      },
    },
    "/api/auth/registration": {
      post: {
        security: [{ Authorization: [] }],
        tags: ["Auth route"],
        summary: "Register a new user",
        description: "Register a new user with their information.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                  fullname: {
                    type: "string",
                  },
                  userrole: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "User has been created successfully",
          },
          400: {
            description: "An error occurred while creating the user",
          },
          422: {
            description: "Invalid input passed, please check your information",
          },
        },
      },
    },
  },
};
