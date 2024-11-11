import { NextFunction, Request, Response } from "express";
import errorHandler from "../helpers/errorHandler";
import { PrismaClient } from "@prisma/client";
import { ResponseError } from "../errors/http.errors";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const db = new PrismaClient();
    const { user } = req.headers as any;
    const role = await db.role.findUnique({
      where: { id: user.roleId },
    });

    const isGranted = role && role.name === "admin";
    if (!isGranted) {
      throw new ResponseError(403, "Unauthorized. Permission denied");
    }

    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

export default isAdmin;
