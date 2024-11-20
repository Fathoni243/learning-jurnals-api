import { Learning_Journal, PrismaClient } from "@prisma/client";
import { Pagination, Search } from "../types/common";

export class LearningJournalRepository {
  name = "learningJournalRepository";

  constructor(public db: PrismaClient) {}

  async createLearningJournal(learningJournalReq: Learning_Journal) {
    return this.db.$transaction(async (tx) => {
      const newLearningJournal = await tx.learning_Journal.create({
        data: learningJournalReq,
      });

      await tx.approval.create({
        data: {
          learningJournalId: newLearningJournal.id,
          status: "pending",
        },
      });

      return newLearningJournal;
    });
  }

  async getLearningJournals(props: Pagination & Search, subjectId: string) {
    return this.db.learning_Journal.findMany({
      where: {
        subjectId,
        OR: [{ learningMaterial: { contains: props.search } }, { learningActivity: { contains: props.search } }],
      },
      take: props.limit,
      skip: props.offset,
      include: {
        approval: true,
        user: true,
      },
    });
  }

  async getLearningJournal(id: string) {
    return this.db.learning_Journal.findUnique({
      where: { id },
      include: {
        subject: true,
        approval: true,
        user: true,
      },
    });
  }

  async updateLearningJournal(id: string, data: Partial<Learning_Journal>) {
    return this.db.learning_Journal.update({
      where: { id },
      data,
    });
  }

  async deleteLearningJournal(id: string, approvalId: string) {
    return this.db.$transaction(async (tx) => {
      await tx.student_Absent.deleteMany({
        where: { learningJournalId: id },
      })

      await tx.approval.delete({
        where: { id: approvalId },
      })

      const deletedResult = await tx.learning_Journal.delete({
        where: { id },
      });

      return deletedResult;
    });
  }
}

export default LearningJournalRepository;
