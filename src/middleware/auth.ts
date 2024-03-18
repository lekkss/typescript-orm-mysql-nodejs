// const User = require("../model/User");
import Jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../error/index.js";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}
const auth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid", "");
  }

  const token = authHeaders.split(" ")[1];

  try {
    const decoded: any = Jwt.verify(token, process.env.JWT_SECRET as string);
    const { id, email } = decoded;
    req.user = { id, email };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid", "");
  }
};

export default auth;
