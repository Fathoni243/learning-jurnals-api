import chalk from "chalk";
import { PrismaClient } from "@prisma/client";

import config from "../config";
import { ConfigProps } from "../config";
import pathResolver from "../helpers/pathResolver";
import createDbConnection from "../factories/dbConnection";
import { Repositories, Services } from "../types/common";

const _populateRepositories = async (db: PrismaClient, config: ConfigProps): Promise<Repositories> => {
  const paths = await pathResolver(__dirname + "/../repositories", { includes: [".repository.js", ".repository.ts"] });
  console.log(chalk.magentaBright(`\nBuilding repositories`));

  let repositories = {} as Repositories;
  for (const item of paths) {
    if (item) {
      console.log(chalk.magentaBright(item.replace(/.*\/repositories\//gi, "./repositories/").replace(".js", ".ts")));
      const { default: RepositoryClass } = await import(item);

      const repositoryClass = new RepositoryClass(db, config);

      repositories = {
        ...repositories,
        [repositoryClass.name]: repositoryClass,
      };
    }
  }
  console.log(chalk.magentaBright(`Success built ${paths.length} repositories`));

  return repositories;
};

const _populateServices = async (ctx: { repositories: Repositories; config: ConfigProps }): Promise<Services> => {
  const paths = await pathResolver(__dirname + "/../services", { includes: [".service.js", ".service.ts"] });
  console.log(chalk.greenBright(`\nBuilding services`));

  let services = {} as Services;
  for (const item of paths) {
    if (item) {
      console.log(chalk.greenBright(item.replace(/.*\/services\//gi, "./services/").replace(".js", ".ts")));

      const { default: ServiceClass } = await import(item);
      const serviceClass = new ServiceClass(ctx);

      services = {
        ...services,
        [serviceClass.name]: serviceClass,
      };
    }
  }
  console.log(chalk.greenBright(`Success built ${paths.length} services`));

  return services;
};

const createService = async () => {
  const mysql = await createDbConnection();

  const repositories = await _populateRepositories(mysql, config);

  const context = {
    repositories,
    config,
  };

  return await _populateServices(context);
};

export default createService;
