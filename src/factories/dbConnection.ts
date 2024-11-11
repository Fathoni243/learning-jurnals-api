import { PrismaClient } from "@prisma/client";
import chalk from "chalk";
import { exit } from "process";
import config from "../config";

const dbConnection = async () => {
  const { mode } = config;
  const prisma = new PrismaClient({ log: mode === "dev" ? ["query", "error"] : undefined });
  try {
    console.log(chalk.greenBright("\nConnecting to database..."));
    await prisma.$queryRaw`SELECT 1`;
    console.log(chalk.greenBright("Database connected successfully"));
    return prisma;
  } catch (error) {
    console.error(error);
    exit(1);
  }
};

export default dbConnection;
