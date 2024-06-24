const jwt = require("jsonwebtoken");

//Environment
const dotenv = require("dotenv");
dotenv.config({
  path: `./.env.${process.env.NODE_ENV}`,
});

const verifyToken = (req, res, next) => {
  //Check token validation in all endpoints but these endpoints
  if (!req.url.includes("/login") && !req.url.includes("/api-docs")) {
    const secretKey = process.env.TOKEN_SECRET_KEY;
    try {
      //Get token from header of request
      const token = req.headers["authorization"].split(" ")[1];

      if (!token) {
        res
          .status(403)
          .send("Access Denied: A token is required for authentication");
      }

      //Verify token and get decoded data
      const decoded = jwt.verify(token, secretKey);
      return next();
    } catch (error) {
      if (error.name == "TokenExpiredError") {
        // Expired token
        res
          .status(403)
          .send(
            "Expired Token: The provided token is no longer valid. Please reauthenticate."
          );
      }
      res
        .status(403)
        .send(
          "Access Denied: The provided token is not authorized for this action"
        );
    }
  } else {
    next();
  }
};

//For add role-base authentication
const verifyUserRole = (req, res, next) => {
  try {
    const secretKey = process.env.TOKEN_SECRET_KEY;

    //Get token
    const token = req.headers["authorization"].split(" ")[1];

    //Verify token and get decoded user data
    const decoded = jwt.verify(token, secretKey);

    //Only admins can perform some actions
    if (decoded.userrole != "admin") {
      res
        .status(403)
        .send(
          "Access Denied: The token provided is not authorized for this action."
        );
    } else {
      next();
    }
  } catch (error) {
    res
      .status(403)
      .send(
        "Access Denied: The provided token is not authorized for this action."
      );
  }
};

module.exports = { verifyToken, verifyUserRole };
