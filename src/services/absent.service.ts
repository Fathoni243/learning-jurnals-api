import { Student_Absent } from "@prisma/client";
import StudentAbsentRepository from "../repositories/absent.repository";
import StudentRepository from "../repositories/student.repository";
import throwIfMissing from "../helpers/throwIfMissing";
import { v7 as uuidv7 } from "uuid";
import LearningJournalRepository from "../repositories/learningJournal.repository";

export class StudentAbsentService {
  name = "studentAbsentService";
  studentAbsentRepository: StudentAbsentRepository;
  learningJournalRepository: LearningJournalRepository;
  studentRepository: StudentRepository;

  constructor(ctx: {
    repositories: {
      studentAbsentRepository: StudentAbsentRepository;
      studentRepository: StudentRepository;
      learningJournalRepository: LearningJournalRepository;
    };
  }) {
    this.studentAbsentRepository = ctx.repositories.studentAbsentRepository;
    this.learningJournalRepository = ctx.repositories.learningJournalRepository;
    this.studentRepository = ctx.repositories.studentRepository;
  }

  async createAbsent(data: Student_Absent) {
    throwIfMissing(data.learningJournalId, "LearningJournalId is required!", 400);
    throwIfMissing(data.studentId, "studentId is required!", 400);

    const checkLearningJournal = await this.learningJournalRepository.getLearningJournal(data.learningJournalId);
    throwIfMissing(checkLearningJournal, "Learning Journal not fount", 404);

    const checkStudent = await this.studentRepository.findStudent(data.studentId);
    throwIfMissing(checkStudent, "Student not found", 404);

    data.id = uuidv7();

    return this.studentAbsentRepository.createAbsent(data);
  }

  async getAbsentsByJournalId(journalId: string) {
    throwIfMissing(journalId, "Learning Journal Id is required!", 400);

    const checkLearningJournal = await this.learningJournalRepository.getLearningJournal(journalId);
    throwIfMissing(checkLearningJournal, "Learning Journal not fount", 404);

    const results = await this.studentAbsentRepository.getAbsentsByJournalId(journalId);

    const mappingResults = results.map((result) => {
      return {
        id: result.id,
        learningJournalId: result.learningJournalId,
        student: {
          id: result.student.id,
          name: result.student.name,
          gender: result.student.gender,
          class: result.student.class.name,
        },
        description: result.description,
      };
    });

    return mappingResults;
  }

  async getAbsentById(id: string) {
    throwIfMissing(id, "Student Absent Id is required!", 400);

    const absent = await this.studentAbsentRepository.getAbsentById(id);
    throwIfMissing(absent, "Student Absent not found", 404);

    const mappingResult = {
      id: absent!.id,
      learningJournalId: absent!.learningJournalId,
      student: {
        id: absent!.student.id,
        name: absent!.student.name,
      },
      description: absent!.description,
    };

    return mappingResult;
  }

  async updateAbsentById(id: string, data: Partial<Student_Absent>) {
    throwIfMissing(id, "Student Absent Id is required!", 400);

    const absent = await this.studentAbsentRepository.getAbsentById(id);
    throwIfMissing(absent, "Student Absent not found", 404);

    if (data.studentId) {
      const checkStudent = await this.studentRepository.findStudent(data.studentId);
      throwIfMissing(checkStudent, "Student not found", 404);
    }

    return this.studentAbsentRepository.updateAbsentById(id, data);
  }

  async deleteAbsentById(id: string) {
    throwIfMissing(id, "Student Absent Id is required!", 400);

    const absent = await this.studentAbsentRepository.getAbsentById(id);
    throwIfMissing(absent, "Student Absent not found", 404);

    return this.studentAbsentRepository.deleteAbsentById(id);
  }
}

export default StudentAbsentService;
