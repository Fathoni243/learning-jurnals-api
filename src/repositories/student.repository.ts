import { PrismaClient, Student } from "@prisma/client";
import { Pagination, Search } from "../types/common";

export class StudentRepository {
  name = "studentRepository";

  constructor(public db: PrismaClient) {}

  async createStudent(data: Student): Promise<Student> {
    return this.db.student.create({
      data,
    });
  }

  async updateStudent(id: string, data: Partial<Student>) {
    return this.db.student.update({
      where: { id },
      data,
    });
  }

  async findStudent(id: string): Promise<Student | null> {
    return this.db.student.findUnique({
      where: { id },
      include: {
        class: true,
      },
    });
  }

  async findStudents(props: Pagination & Search, classId: string): Promise<Student[]> {
    return this.db.student.findMany({
      where: {
        classId,
        name: { contains: props.search },
      },
      take: props.limit,
      skip: props.offset,
      include: {
        class: true,
      },
    });
  }

  async deleteStudent(id: string) {
    return this.db.student.delete({
      where: { id },
    });
  }
}

export default StudentRepository;
