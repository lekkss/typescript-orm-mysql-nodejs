import { StatusCodes } from "http-status-codes";

export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
  serializedError(): IError;
}

export interface IError {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;
  comingFrom: string;

  constructor(message: string, comingFrom: string) {
    super(message);
    this.comingFrom = comingFrom;
  }

  serializedError(): IError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      status: this.status,
      comingFrom: this.comingFrom,
    };
  }
}

export class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  status = "error";

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;
  status = "error";

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}
export class UnauthenticatedError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;
  status = "error";

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}
export class FileTooLongError extends CustomError {
  statusCode = StatusCodes.REQUEST_TOO_LONG;
  status = "error";

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class ServerError extends CustomError {
  statusCode = StatusCodes.SERVICE_UNAVAILABLE;
  status = "error";

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export interface ErrornoException extends Error {
  errorno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}
