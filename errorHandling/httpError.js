class httpError extends Error {
  constructor(message, errorCode) {
    super(message); //error message
    this.code = errorCode; // error status code
  }
}

module.exports = httpError;
