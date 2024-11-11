import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import config from "../config";

const generateSwagger = () => {
  const { name, description, version } = config;

  const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.3",
      info: {
        title: name,
        description,
        version,
      },
    },
    apis: ["src/routes/*.ts", "src/routes/*/*.ts", "src/routes/*/*/*.ts"],
  };
  const swaggerDocs = swaggerJsDoc(swaggerOptions);

  return {
    serve: swaggerUI.serve,
    /**pengaturan swagger option ada disini, untuk sekarang, fodler yang bisa diisi `swager-js-doc` ada di dalam `routes` folder */
    setup: swaggerUI.setup(swaggerDocs),
  };
};

export default generateSwagger;
