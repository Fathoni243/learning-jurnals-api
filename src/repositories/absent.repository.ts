import { PrismaClient, Student_Absent } from "@prisma/client";

export class StudentAbsentRepository {
  name = "studentAbsentRepository";

  constructor(public db: PrismaClient) {}

  async createAbsent(data: Student_Absent): Promise<Student_Absent> {
    return this.db.student_Absent.create({ data });
  }

  async getAbsentsByJournalId(journalId: string) {
    return this.db.student_Absent.findMany({
      where: {
        learningJournalId: journalId,
      },
      include: {
        student: {
          include: {
            class: true,
          },
        },
      },
    });
  }

  async getAbsentById(id: string) {
    return this.db.student_Absent.findUnique({
      where: { id },
      include: {
        student: true,
      },
    });
  }

  async updateAbsentById(id: string, data: Partial<Student_Absent>) {
    return this.db.student_Absent.update({
      where: { id },
      data,
    });
  }

  async deleteAbsentById(id: string) {
    return this.db.student_Absent.delete({
      where: { id },
    });
  }
}

export default StudentAbsentRepository;
