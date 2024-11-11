import { Class } from "@prisma/client";
import ClassRepository from "../repositories/class.repository";
import throwIfMissing from "../helpers/throwIfMissing";
import { v7 as uuidv7 } from "uuid";
import { Pagination, Search } from "../types/common";

export class ClassService {
  name = "classService";
  classRepository: ClassRepository;

  constructor(ctx: {
    repositories: {
      classRepository: ClassRepository;
    };
  }) {
    this.classRepository = ctx.repositories.classRepository;
  }

  async createClass(data: Class) {
    throwIfMissing(data.name, "Name is required!", 400);
    throwIfMissing(data.description, "Description is required!", 400);

    data.id = uuidv7();

    return this.classRepository.createClass(data);
  }

  async getClassById(id: string) {
    throwIfMissing(id, "Id is required!", 400);

    const checkUser = await this.classRepository.findClassById(id);
    throwIfMissing(checkUser, "Class not found", 404);

    return this.classRepository.findClassById(id);
  }

  async getAllClass(props: Pagination & Search) {
    props.limit = Number(props.limit ?? 10);
    props.offset = Number(props.offset ?? 0);
    props.search = props.search ?? "";

    return this.classRepository.findClass(props);
  }

  async updateClass(id: string, data: Partial<Class>) {
    throwIfMissing(id, "Id is required!", 400);

    const checkClass = await this.classRepository.findClassById(id);
    throwIfMissing(checkClass, "Class not found", 404);

    return this.classRepository.updateClass(id, data);
  }

  async deleteClass(id: string) {
    throwIfMissing(id, "Id is required!", 400);

    const checkUser = await this.classRepository.findClassById(id);
    throwIfMissing(checkUser, "Class not found", 404);

    return this.classRepository.deleteClass(id);
  }
}

export default ClassService;
