import { Subject } from "@prisma/client";
import SubjectRepository from "../repositories/subject.repository";
import throwIfMissing from "../helpers/throwIfMissing";
import { v7 as uuidv7 } from "uuid";
import { Pagination, Search } from "../types/common";

export class SubjectService {
  name = "subjectService";
  subjectRepository: SubjectRepository;

  constructor(ctx: {
    repositories: {
      subjectRepository: SubjectRepository;
    };
  }) {
    this.subjectRepository = ctx.repositories.subjectRepository;
  }

  async createSubject(data: Subject) {
    throwIfMissing(data.name, "Name is required!", 400);
    throwIfMissing(data.classId, "ClassId is required!", 400);

    /** TODO : Check if class exists */

    data.id = uuidv7();
    return this.subjectRepository.createSubject(data);
  }

  async updateSubject(id: string, data: Partial<Subject>) {
    throwIfMissing(id, "Id is required!", 400);

    const checkSubject = await this.subjectRepository.findSubject(id);
    throwIfMissing(checkSubject, "Subject not found", 404);

    if (data.classId) {
      /** TODO : Check if class exists */
    }

    return this.subjectRepository.updateSubject(id, data);
  }

  async getSubject(id: string) {
    throwIfMissing(id, "Id is required!", 400);

    const checkSubject = await this.subjectRepository.findSubject(id);
    throwIfMissing(checkSubject, "Subject not found", 404);

    return this.subjectRepository.findSubject(id);
  }

  async getSubjects(props: Pagination & Search, classId: string) {
    props.limit = Number(props.limit ?? 10);
    props.offset = Number(props.offset ?? 0);
    props.search = props.search ?? "";

    /** TODO : Check if class exists */

    return this.subjectRepository.findSubjects(props, classId);
  }

  async deleteSubject(id: string) {
    throwIfMissing(id, "Id is required!", 400);

    const checkSubject = await this.subjectRepository.findSubject(id);
    throwIfMissing(checkSubject, "Subject not found", 404);

    return this.subjectRepository.deleteSubject(id);
  }
}

export default SubjectService;
