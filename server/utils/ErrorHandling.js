class ErrorHandling extends Error {
  constructor(message, statusCode) {
    if (
      typeof statusCode !== "number" ||
      !Number.isInteger(statusCode) ||
      statusCode < 100 ||
      statusCode > 599
    ) {
      throw new Error("Invalid status code");
    }
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
export default ErrorHandling;
