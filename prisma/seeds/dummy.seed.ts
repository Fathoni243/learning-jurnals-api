import { PrismaClient } from "@prisma/client";
import { seedUsers } from "./user.seed";

const prisma = new PrismaClient();

async function main() {
  try {
    await seedUsers();
    console.log("Users seeded successfully");

    console.log("All seeders completed successfully");
  } catch (error) {
    console.error("Error running seeders:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
