import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedSubjects() {
  const classIds = [
    "01931b68-6c31-748d-a0cc-2a96f3b01e25", // kelas 1
    "01931b69-3976-7a78-bb49-0efd4b04f2ab", // kelas 2
    "01931b69-65f0-7519-b533-ce9a2bac8b1c", // kelas 3
  ];

  const subjectsData = [
    // Kelas 1
    { id: "0193258a-772d-7c72-9918-2e926b553baa", classId: classIds[0], name: "MTK", description: "MTK kelas 1" },
    { id: "0193258a-8c95-78fc-b493-c69dbe04ebfe", classId: classIds[0], name: "Bindo", description: "Bindo kelas 1" },
    { id: "0193258a-98df-7a73-8cf1-23c4008c71f6", classId: classIds[0], name: "IPA", description: "IPA kelas 1" },
    { id: "0193258a-a656-76de-a0ea-cac5596e4053", classId: classIds[0], name: "IPS", description: "IPS kelas 1" },
    { id: "0193258a-b376-73bf-8d2e-5116558e58cb", classId: classIds[0], name: "PKN", description: "PKN kelas 1" },

    // Kelas 2
    { id: "0193258a-c0cf-78b2-874f-4bcb282b692b", classId: classIds[1], name: "MTK", description: "MTK kelas 2" },
    { id: "0193258a-ce66-7337-acb7-5cd3527f99e8", classId: classIds[1], name: "Bindo", description: "Bindo kelas 2" },
    { id: "0193258a-de2e-7e0b-adcb-8eb5618ea45c", classId: classIds[1], name: "IPA", description: "IPA kelas 2" },
    { id: "0193258a-edd1-7983-8cb3-4d3827a0e815", classId: classIds[1], name: "IPS", description: "IPS kelas 2" },
    { id: "0193258b-08cd-7edf-bbb6-49bbcb42bfef", classId: classIds[1], name: "PKN", description: "PKN kelas 2" },

    // Kelas 3
    { id: "0193258b-1ade-7ac3-8640-53e14bf9528c", classId: classIds[2], name: "MTK", description: "MTK kelas 3" },
    { id: "0193258b-2ca7-730d-828f-f3835cf1cac5", classId: classIds[2], name: "Bindo", description: "Bindo kelas 3" },
    { id: "0193258b-3b38-78c4-8acb-f36e6c71a25a", classId: classIds[2], name: "IPA", description: "IPA kelas 3" },
    { id: "0193258b-4a76-7932-9b69-229fe0892572", classId: classIds[2], name: "IPS", description: "IPS kelas 3" },
    { id: "0193258b-5676-7d75-9cb0-e47e873643db", classId: classIds[2], name: "PKN", description: "PKN kelas 3" },
  ];

  const subjectsPromises = subjectsData.map((subject) =>
    prisma.subject.upsert({
      where: { id: subject.id },
      update: subject,
      create: subject,
    })
  );

  const results = await Promise.all(subjectsPromises);

  console.log("Subjects created or updated:", results);
}
