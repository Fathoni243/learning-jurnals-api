import { Gender, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedStudent() {
  const classIds = [
    "01931b68-6c31-748d-a0cc-2a96f3b01e25", // kelas 1
    "01931b69-3976-7a78-bb49-0efd4b04f2ab", // kelas 2
    "01931b69-65f0-7519-b533-ce9a2bac8b1c", // kelas 3
  ];
  const gender = [Gender.male, Gender.female];

  const studentsData = [
    // Kelas 1
    { id: "01932577-4b7a-7213-9897-afcabccd74e4", classId: classIds[0], name: "Student 1 kelas 1", gender: gender[0] },
    { id: "01932577-9181-796c-abc5-fa4dc3adcfeb", classId: classIds[0], name: "Student 2 kelas 1", gender: gender[0] },
    { id: "01932577-a186-7623-aba5-4433688dca9a", classId: classIds[0], name: "Student 3 kelas 1", gender: gender[0] },
    { id: "01932577-b122-7915-946b-745bd544e2ba", classId: classIds[0], name: "Student 4 kelas 1", gender: gender[1] },
    { id: "01932577-cc65-7ffc-8c67-60d6019b8b57", classId: classIds[0], name: "Student 5 kelas 1", gender: gender[1] },

    // Kelas 2
    { id: "01932577-dcb1-73f9-9e9a-a5d84f2336b1", classId: classIds[1], name: "Student 1 kelas 2", gender: gender[0] },
    { id: "01932577-ea28-7a6e-b3a2-0ba9f7bed064", classId: classIds[1], name: "Student 2 kelas 2", gender: gender[0] },
    { id: "01932577-f7d0-77bf-8c9b-e70847e9d522", classId: classIds[1], name: "Student 3 kelas 2", gender: gender[0] },
    { id: "01932578-06ef-7994-8c37-6c69c8335988", classId: classIds[1], name: "Student 4 kelas 2", gender: gender[1] },
    { id: "01932578-1448-70e9-91ea-9209585ea431", classId: classIds[1], name: "Student 5 kelas 2", gender: gender[1] },

    // Kelas 3
    { id: "01932578-2200-700e-a182-a6c7606d71c6", classId: classIds[2], name: "Student 1 kelas 3", gender: gender[0] },
    { id: "01932578-32cc-7ebf-8175-5d572cfc6290", classId: classIds[2], name: "Student 2 kelas 3", gender: gender[0] },
    { id: "01932578-428b-7c1d-b0c8-2f6c2c274736", classId: classIds[2], name: "Student 3 kelas 3", gender: gender[0] },
    { id: "01932578-4fc1-71fb-ae26-2d174ee98801", classId: classIds[2], name: "Student 4 kelas 3", gender: gender[1] },
    { id: "01932578-5e1a-7afc-af94-ec59f59ef719", classId: classIds[2], name: "Student 5 kelas 3", gender: gender[1] },
  ];

  const studentsPromises = studentsData.map(async (student) =>
    prisma.student.upsert({
      where: { id: student.id },
      update: student,
      create: student,
    })
  );

  const results = await Promise.all(studentsPromises);

  console.log("students created or updated:", results);
}
