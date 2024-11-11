import config from "./config";
import { setupServer } from "./server";

async function run() {
  const app = await setupServer();
  app.listen(config.port, () =>
    console.log(`
    ==========================================
          Server is running on port ${config.port}
    ==========================================
    `)
  );
}

run();
