class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.errorMessage = message;
  }
}

module.exports = NotFoundError;
