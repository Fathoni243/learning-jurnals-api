import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedRoles() {
  const roles = [
    {
      id: "0193165d-af71-7e42-99e0-10f42b3b1574",
      name: "admin",
      description: "Ini role untuk Kepala Sekolah",
    },
    {
      id: "0193165f-35c0-700e-a9ca-fb28d683cedf",
      name: "user",
      description: "Ini role untuk Guru",
    },
  ];

  const rolesPromises = roles.map((role) =>
    prisma.role.upsert({
      where: { id: role.id },
      update: role,
      create: role,
    })
  );

  const results = await Promise.all(rolesPromises);

  console.log("Roles created or updated:", results);
}
