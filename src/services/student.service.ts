import { Student } from "@prisma/client";
import throwIfMissing from "../helpers/throwIfMissing";
import StudentRepository from "../repositories/student.repository";
import { ResponseError } from "../errors/http.errors";
import { v7 as uuidv7 } from "uuid";
import ClassRepository from "../repositories/class.repository";
import { Pagination, Search } from "../types/common";
import UserRepository from "../repositories/user.repository";

export class StudentService {
  name = "studentService";
  studentRepository: StudentRepository;
  classRepository: ClassRepository;
  userRepository: UserRepository;

  constructor(ctx: {
    repositories: {
      studentRepository: StudentRepository;
      classRepository: ClassRepository;
      userRepository: UserRepository;
    };
  }) {
    this.studentRepository = ctx.repositories.studentRepository;
    this.classRepository = ctx.repositories.classRepository;
    this.userRepository = ctx.repositories.userRepository;
  }

  async createStudent(data: Student) {
    throwIfMissing(data.name, "Name is required!", 400);
    throwIfMissing(data.classId, "ClassId is required!", 400);

    const checkClass = await this.classRepository.findClassById(data.classId);
    throwIfMissing(checkClass, "Class not found", 404);

    if (data.gender !== "female" && data.gender !== "male") {
      throw new ResponseError(400, "Gender not valid");
    }

    data.id = uuidv7();

    return this.studentRepository.createStudent(data);
  }

  async updateStudent(id: string, data: Partial<Student>) {
    throwIfMissing(id, "Id is required!", 400);

    const checkStudent = await this.studentRepository.findStudent(id);
    throwIfMissing(checkStudent, "Student not found", 400);

    if (data.gender && data.gender !== "female" && data.gender !== "male") {
      throw new ResponseError(400, "Gender not valid");
    }

    return this.studentRepository.updateStudent(id, data);
  }

  async getStudent(id: string) {
    throwIfMissing(id, "Id is required!", 400);

    const checkStudent = await this.studentRepository.findStudent(id);
    throwIfMissing(checkStudent, "Student not found", 400);

    return this.studentRepository.findStudent(id);
  }

  async getStudents(props: Pagination & Search, classId: string) {
    props.limit = Number(props.limit ?? 10);
    props.offset = Number(props.offset ?? 0);
    props.search = props.search ?? "";

    const checkClass = await this.classRepository.findClassById(classId);
    throwIfMissing(checkClass, "Class not found", 404);

    return this.studentRepository.findStudents(props, classId);
  }

  async getStudentsForTeacher(props: Pagination & Search, teacherId: string) {
    props.limit = Number(props.limit ?? 10);
    props.offset = Number(props.offset ?? 0);
    props.search = props.search ?? "";

    const user = await this.userRepository.findUserById(teacherId);
    throwIfMissing(user, "User not found", 404);

    return this.studentRepository.findStudents(props, user!.classId!);
  }

  async deleteStudent(id: string) {
    throwIfMissing(id, "Id is required!", 400);

    return this.studentRepository.deleteStudent(id);
  }
}

export default StudentService;
