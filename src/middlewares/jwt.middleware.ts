import type { NextFunction, Request, Response } from "express";
import throwIfMissing from "../helpers/throwIfMissing";
import errorHandler from "../helpers/errorHandler";
import { jwtVerify } from "../helpers/jwt";
import { IGNORED_JWT_PATH, IGNORED_JWT_PATH_START_WITH } from "../constant/IGNORED_PATH";

const jwtMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  if (IGNORED_JWT_PATH.includes(req.path)) {
    next();
    return;
  } 

  for (const e of IGNORED_JWT_PATH_START_WITH) {
    if (req.path.startsWith(e)) {
      next();
      return;
    }
  }

  try {
    const jwt = req.headers.jwt;

    throwIfMissing(jwt, "jwt is required", 400);
    const decodedJwt = jwtVerify(jwt as string);
    req.headers.user = decodedJwt as any;
    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

export default jwtMiddleWare;
