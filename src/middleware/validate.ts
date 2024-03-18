import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

interface ExtendedRequest extends Request {
  value?: {
    body?: any;
  };
}
interface ValidationSchema {
  validate: (value: any, options?: any) => { error: any; value: any };
}

const options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

const validateRequest = (schema: ValidationSchema) => {
  return (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const result = schema.validate(req.body, options);
    if (result.error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        statusCode: StatusCodes.BAD_REQUEST,
        status: false,
        message: result.error.details[0].message,
      });
    }
    if (!req.value) {
      req.value = {};
    }
    req.value["body"] = result.value;
    next();
  };
};

export default validateRequest;
