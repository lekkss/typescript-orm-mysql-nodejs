import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes"; // Import StatusCodes enum

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name === "CastError") {
    customError.msg = `No item found with id ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${
      Object.keys(err.keyValue)[0]
    } field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
    return res
      .status(customError.statusCode)
      .json({ status: false, message: customError.msg });
  }
  return res
    .status(customError.statusCode)
    .json({ status: false, message: customError.msg });
};

export default errorHandlerMiddleware;
