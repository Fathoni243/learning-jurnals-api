import { PrismaClient } from "@prisma/client";
import { seedUsers } from "./user.seed";
import { seedClasses } from "./class.seed";
import { seedStudent } from "./student.seed";
import { seedSubjects } from "./subject.seed";

const prisma = new PrismaClient();

async function main() {
  try {
    await seedClasses();
    console.log("Classes seeded successfully");

    await seedUsers();
    console.log("Users seeded successfully");

    await seedStudent();
    console.log("Students seeded successfully");

    await seedSubjects();
    console.log("Subjects seeded successfully");

    console.log("All seeders completed successfully");
  } catch (error) {
    console.error("Error running seeders:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
