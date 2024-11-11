import express, { Request, Response } from "express";
import basicAuth from "express-basic-auth";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import getRoutes from "./routes";
import getMiddleWares from "./middlewares";
import config from "../config";
import generateSwagger from "./swagger";
import createService from "./services";

dotenv.config();

export const setupServer = async () => {
  const app: any = express();

  /** Middleware initialization */
  app.use(cors());
  app.use(express.json({ limit: "5mb" }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  if (config.mode === "dev") {
    const { serve, setup } = generateSwagger();
    app.use("/docs", basicAuth({ users: { admin: "admin@12345" }, challenge: true }), serve, setup);
  }

  /** middleware */
  app.use(await getMiddleWares());
  
  /** services */
  app.services = await createService();

  /**routes */
  app.use(await getRoutes());

  /** robots.txt */
  app.get("/robots.txt", (req: Request, res: Response) => {
    res.type("text/plain");
    res.send(`# https://www.robotstxt.org/robotstxt.html\nUser-agent: *\nDisallow: /`);
  });

  app.use("*", (req: Request, res: Response) => {
    res.status(404).json("404 Page Not Found");
  });

  return app;
};
