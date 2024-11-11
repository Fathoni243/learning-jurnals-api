import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedClasses() {
  const classesData = [
    {
      id: "01931b68-6c31-748d-a0cc-2a96f3b01e25",
      name: "Kelas 1",
      description: "Deskripsi kelas 1",
    },
    {
      id: "01931b69-3976-7a78-bb49-0efd4b04f2ab",
      name: "Kelas 2",
      description: "Deskripsi kelas 2",
    },
    {
      id: "01931b69-65f0-7519-b533-ce9a2bac8b1c",
      name: "Kelas 3",
      description: "Deskripsi kelas 3",
    },
    {
      id: "01931b69-9582-7483-8151-3b2518adcc2e",
      name: "Kelas 4",
      description: "Deskripsi kelas 4",
    },
    {
      id: "01931b69-d4c1-7846-8a2c-4ac3d05bd6d8",
      name: "Kelas 5",
      description: "Deskripsi kelas 5",
    },
    {
      id: "01931b69-f758-7727-a3b4-666e2db9a189",
      name: "Kelas 6",
      description: "Deskripsi kelas 6",
    },
  ];

  const classesPromises = classesData.map((classData) =>
    prisma.class.upsert({
      where: { id: classData.id },
      update: classData,
      create: classData,
    })
  );

  const results = await Promise.all(classesPromises);

  console.log("Classes created or updated:", results);
}
