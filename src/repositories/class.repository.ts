import { Class, PrismaClient } from "@prisma/client";
import { Pagination, Search } from "../types/common";
import throwIfMissing from "../helpers/throwIfMissing";

export class ClassRepository {
  name = "classRepository";

  constructor(public db: PrismaClient) {}

  async findClassById(id: string){
    throwIfMissing(id, "Unauthorized", 401);

    return this.db.class.findUnique({ where: {id: id}});
  }

  async createClass(data: Class) {
    return this.db.class.create({
      data: data,
    });
  }

  async updateClass(id: string, data: Partial<Class>) {
    return this.db.class.update({
      where: { id: id },
      data: data,
    });
  }

  async findClass(props: Pagination & Search) {
    return this.db.class.findMany({
      where: {
        name: { contains: props.search },
      },
      take: props.limit,
      skip: props.offset,
    });
  }

  async deleteClass(id: string) {
    return this.db.class.delete({ where: { id: id } });
  }
}

export default ClassRepository;
