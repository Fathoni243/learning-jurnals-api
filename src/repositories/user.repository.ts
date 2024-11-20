import { PrismaClient, User } from "@prisma/client";

import throwIfMissing from "../helpers/throwIfMissing";
import { Pagination, Search } from "../types/common";

/**
 * User Repository
 */
export class UserRepository {
  name = "userRepository";

  constructor(public db: PrismaClient) {}

  async findUserById(id: string) {
    throwIfMissing(id, "Unauthorized", 401);

    return this.db.user.findUnique({
      where: { id },
      include: {
        role: true,
        class: true,
      },
    });
  }

  async findUserByEmail(email: string) {
    throwIfMissing(email, "Unauthorized", 401);

    return this.db.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });
  }

  async createUser(data: User) {
    return this.db.user.create({
      data: data,
      select: {
        email: true,
        fullName: true,
        roleId: true,
        classId: true,
      },
    });
  }

  async updateUser(id: string, data: Partial<User>) {
    return this.db.user.update({
      where: { id: id },
      data: data,
      select: {
        email: true,
        fullName: true,
        roleId: true,
        classId: true,
      },
    });
  }

  async findUsers(props: Pagination & Search) {
    return this.db.user.findMany({
      where: {
        OR: [{ email: { contains: props.search } }, { fullName: { contains: props.search } }],
      },
      take: props.limit,
      skip: props.offset,
      select: {
        id: true,
        email: true,
        fullName: true,
        roleId: true,
        classId: true,
        role: true,
        class: true,
      },
    });
  }

  async deleteUser(id: string) {
    return this.db.user.delete({ where: { id } });
  }
}

export default UserRepository;
