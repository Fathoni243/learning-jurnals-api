import { Approval, Learning_Journal } from "@prisma/client";
import LearningJournalRepository from "../repositories/learningJournal.repository";
import throwIfMissing from "../helpers/throwIfMissing";
import SubjectRepository from "../repositories/subject.repository";
import { v7 as uuidv7 } from "uuid";
import { Pagination, Search } from "../types/common";
import { format } from "date-fns";
import { ResponseError } from "../errors/http.errors";

export class LearningJournalService {
  name = "learningJournalService";
  learningJournalRepository: LearningJournalRepository;
  subjectRepository: SubjectRepository;

  constructor(ctx: {
    repositories: {
      learningJournalRepository: LearningJournalRepository;
      subjectRepository: SubjectRepository;
    };
  }) {
    this.learningJournalRepository = ctx.repositories.learningJournalRepository;
    this.subjectRepository = ctx.repositories.subjectRepository;
  }

  async createLearningJournal(data: Learning_Journal) {
    throwIfMissing(data.subjectId, "SubjectId is required!", 400);
    throwIfMissing(data.date, "Date is required!", 400);
    throwIfMissing(data.learningMaterial, "learningMaterial is required!", 400);
    throwIfMissing(data.learningActivity, "LearningActivity is required!", 400);

    const checkSubject = await this.subjectRepository.findSubject(data.subjectId);
    throwIfMissing(checkSubject, "Subject not found", 404);

    data.id = uuidv7();

    return this.learningJournalRepository.createLearningJournal(data);
  }

  async getLearningJournals(props: Pagination & Search, subjectId: string) {
    throwIfMissing(subjectId, "SubjectId is required!", 400);
    props.limit = Number(props.limit ?? 10);
    props.offset = Number(props.offset ?? 0);
    props.search = props.search ?? "";

    const checkSubject = await this.subjectRepository.findSubject(subjectId);
    throwIfMissing(checkSubject, "Subject not found", 404);

    const results = await this.learningJournalRepository.getLearningJournals(props, subjectId);

    const mappingResult = results.map((result) => {
      return {
        id: result.id,
        subjectId: result.subjectId,
        date: format(result.date, "yyyy-MM-dd"),
        learningMaterial: result.learningMaterial,
        learningActivity: result.learningActivity,
        description: result.description,
        statusApproval: result.approval!.status,
        createdBy: result.user.fullName,
      };
    });

    return mappingResult;
  }

  async getLearningJournal(id: string) {
    throwIfMissing(id, "Id is required!", 400);

    const learningJournal = await this.learningJournalRepository.getLearningJournal(id);
    throwIfMissing(learningJournal, "Learning Journal not found", 404);

    const mappingResult = {
      id: learningJournal!.id,
      date: format(learningJournal!.date, "yyyy-MM-dd"),
      learningMaterial: learningJournal!.learningMaterial,
      learningActivity: learningJournal!.learningActivity,
      description: learningJournal!.description,
      subject: {
        id: learningJournal!.subjectId,
        name: learningJournal!.subject.name,
      },
      approval: {
        id: learningJournal!.approval!.id,
        status: learningJournal!.approval!.status,
        description: learningJournal!.approval?.description,
      },
      createdBy: {
        id: learningJournal!.user.id,
        fullName: learningJournal!.user.fullName,
      },
    };

    return mappingResult;
  }

  async updateLearningJournal(id: string, data: Partial<Learning_Journal>) {
    throwIfMissing(id, "Id is required!", 400);

    const checkLearningJournal = await this.learningJournalRepository.getLearningJournal(id);
    throwIfMissing(checkLearningJournal, "Learning Journal not found", 404);

    if (checkLearningJournal?.approval?.status === "approved") {
      throw new ResponseError(400, "Learning Journal already approved");
    }

    if (checkLearningJournal?.approval?.status === "rejected") {
      throw new ResponseError(400, "Learning Journal already rejected");
    }

    return this.learningJournalRepository.updateLearningJournal(id, data);
  }

  async deleteLearningJournal(id: string) {
    throwIfMissing(id, "Id is required!", 400);

    const checkLearningJournal = await this.learningJournalRepository.getLearningJournal(id);
    throwIfMissing(checkLearningJournal, "Learning Journal not found", 404);

    if (checkLearningJournal?.approval?.status === "approved") {
      throw new ResponseError(400, "Learning Journal already approved");
    }

    if (checkLearningJournal?.approval?.status === "rejected") {
      throw new ResponseError(400, "Learning Journal already rejected");
    }

    return this.learningJournalRepository.deleteLearningJournal(id, checkLearningJournal!.approval!.id);
  }

  async approveLearningJournal(id: string, data: Partial<Approval>) {
    throwIfMissing(id, "Id Approval is required!", 400);

    const checkApproval = await this.learningJournalRepository.getApprovalbyId(id);
    throwIfMissing(checkApproval, "Approval not found", 404);

    if (data.status && data.status !== "approved" && data.status !== "rejected") {
      throw new ResponseError(400, "Status must be approved or rejected");
    }

    return this.learningJournalRepository.approveLearningJournal(id, data);
  }
}

export default LearningJournalService;
