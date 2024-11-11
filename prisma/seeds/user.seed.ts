import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function seedUsers() {
  const passwordHash = await bcrypt.hash("password", 10);

  const roleIds = ["0193165d-af71-7e42-99e0-10f42b3b1574", "0193165f-35c0-700e-a9ca-fb28d683cedf"];
  const classIds = [
    "01931b68-6c31-748d-a0cc-2a96f3b01e25",
    "01931b69-3976-7a78-bb49-0efd4b04f2ab",
    "01931b69-65f0-7519-b533-ce9a2bac8b1c",
    "01931b69-9582-7483-8151-3b2518adcc2e",
    "01931b69-d4c1-7846-8a2c-4ac3d05bd6d8",
    "01931b69-f758-7727-a3b4-666e2db9a189",
  ];

  const usersData = [
    {
      id: "01931660-0f10-7635-beab-221ec77fa4e2",
      email: "kepsek@gmail.com",
      password: passwordHash,
      fullName: "Kepala Sekolah",
      roleId: roleIds[0],
      classId: null,
    },
    {
      id: "01931660-2788-75dd-a8e0-9dd288239f70",
      email: "guru1@gmail.com",
      password: passwordHash,
      fullName: "Guru Kelas 1",
      roleId: roleIds[1],
      classId: classIds[0],
    },
    {
      id: "01931660-3d59-7af3-a200-0c28425c8723",
      email: "guru2@gmail.com",
      password: passwordHash,
      fullName: "Guru Kelas 2",
      roleId: roleIds[1],
      classId: classIds[1],
    },
    {
      id: "01931b73-80e6-7521-a315-976fe79d3eb3",
      email: "guru3@gmail.com",
      password: passwordHash,
      fullName: "Guru Kelas 3",
      roleId: roleIds[1],
      classId: classIds[2],
    },
    {
      id: "01931b74-fcc4-718d-b35c-ddfa47a5ac2b",
      email: "guru4@gmail.com",
      password: passwordHash,
      fullName: "Guru Kelas 4",
      roleId: roleIds[1],
      classId: classIds[3],
    },
    {
      id: "01931b75-5ea3-7a1d-8743-12d56923f813",
      email: "guru5@gmail.com",
      password: passwordHash,
      fullName: "Guru Kelas 5",
      roleId: roleIds[1],
      classId: classIds[4],
    },
    {
      id: "01931b75-b1bc-79d0-b65a-abff33948640",
      email: "guru6@gmail.com",
      password: passwordHash,
      fullName: "Guru Kelas 6",
      roleId: roleIds[1],
      classId: classIds[5],
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
