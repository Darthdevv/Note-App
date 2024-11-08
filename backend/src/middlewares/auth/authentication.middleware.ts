import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import AppError from "../../utils/appError";

/**
 * @returns {void} - The function itself does not return any value explicitly (i.e., it returns undefined implicitly as it is an async function). Instead, it passes control to the next middleware or route handler using the next function.
 * @description Checks if the user is authenticated by verifying the JWT token in the Authorization header.
 */

interface AuthenticatedRequest extends Request {
  user?: string | jwt.JwtPayload; // Modify as per your user object structure
}

const authenticationHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authorization =
    req.headers.authorization || (req.headers.Authorization as string);

  if (authorization && authorization.startsWith("Bearer")) {
    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
      if (err) {
        return next(new AppError("Unauthorized, invalid token.", 403));
      }

      req.user = decoded; // Store the decoded user info in req.user
      next();
    });
  } else {
    return next(new AppError("Unauthorized, no token provided.", 401));
  }
};

export default authenticationHandler;
