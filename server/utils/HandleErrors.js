import ErrorHandling from "./ErrorHandling.js";

const HandleError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";
  //incorrect mongodb id error
  if (err.name === "CastError") {
    const msg = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandling(msg, 400); //bad request
  }
  //mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandling(message, 400);
  }
  //wrong jwt token
  if (err.code === "JsonWebTokenError") {
    const message = `JWT token is invalid, please try again`;
    err = new ErrorHandling(message, 400);
  }
  //JWT token expire
  if (err.code === "TokenExpireError") {
    const message = `JWT token is Expired, please try again`;
    err = new ErrorHandling(message, 400);
  }
  res.status(err.statusCode).send(err.message);
};
export default HandleError;
