import { PrismaClient } from "@prisma/client";
import { seedRoles } from "./role.seed";

const prisma = new PrismaClient();

async function main() {
  await seedRoles();
  console.log("Roles seeded successfully");

  console.log("All seeders completed successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
