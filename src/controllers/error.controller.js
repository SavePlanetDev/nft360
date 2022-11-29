const { responseData } = require("../utils/response");

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  responseData(
    res,
    error.status,
    error.statusCode,
    error.functionCall,
    error.message,
    error.result
  );
};
