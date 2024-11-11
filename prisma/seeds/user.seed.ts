import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function seedUsers() {
  const passwordHash = await bcrypt.hash("password", 10);

  const roleIds = ["0193165d-af71-7e42-99e0-10f42b3b1574", "0193165f-35c0-700e-a9ca-fb28d683cedf"];

  const usersData = [
    {
      id: "01931660-0f10-7635-beab-221ec77fa4e2",
      email: "kepsek@gmail.com",
      password: passwordHash,
      fullName: "Kepala Sekolah",
      roleId: roleIds[0],
    },
    {
      id: "01931660-2788-75dd-a8e0-9dd288239f70",
      email: "guru1@gmail.com",
      password: passwordHash,
      fullName: "Guru Kelas 1",
      roleId: roleIds[1],
    },
    {
      id: "01931660-3d59-7af3-a200-0c28425c8723",
      email: "guru2@gmail.com",
      password: passwordHash,
      fullName: "Guru Kelas 2",
      roleId: roleIds[1],
    },
  ];

  const usersPromises = usersData.map((user) =>
    prisma.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    })
  );

  const results = await Promise.all(usersPromises);

  console.log("Users created or updated:", results);
}
