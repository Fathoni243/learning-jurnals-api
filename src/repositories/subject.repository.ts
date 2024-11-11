import { PrismaClient, Subject } from "@prisma/client";
import { Pagination, Search } from "../types/common";

export class SubjectRepository {
  name = "subjectRepository";

  constructor(public db: PrismaClient) {}

  async createSubject(data: Subject): Promise<Subject> {
    return this.db.subject.create({
      data,
    });
  }

  async updateSubject(id: string, data: Partial<Subject>) {
    return this.db.subject.update({
      where: { id },
      data,
    });
  }

  async findSubject(id: string): Promise<Subject | null> {
    return this.db.subject.findUnique({
      where: { id },
      include: {
        class: true,
      },
    });
  }

  async findSubjects(props: Pagination & Search, classId: string): Promise<Subject[]> {
    return this.db.subject.findMany({
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

  async deleteSubject(id: string) {
    return this.db.subject.delete({ where: { id } });
  }
}

export default SubjectRepository;
