import chalk from "chalk";
import { Router } from "express";
import pathResolver from "../helpers/pathResolver";

const getRoutes = async () => {
  const paths = await pathResolver(__dirname + "/../routes", { includes: [".route.js", ".route.ts"] });
  console.log(chalk.cyanBright(`\nBuilding routes`));
  const routers: Router[] = [];

  for (const item of paths) {
    if (item) {
      console.log(chalk.cyanBright(item.replace(/.*\/routes\//gi, "./routes/").replace(".js", ".ts")));
      const { default: router } = await import(item);

      routers.push(router);
    }
  }
  console.log(chalk.cyanBright(`Success built ${paths.length} routes`));
  return routers;
};

export default getRoutes;
