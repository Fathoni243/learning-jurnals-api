import { PrismaClient, Role } from "@prisma/client";
import { Pagination } from "../types/common";

export class RoleRepository {
  name = "roleRepository";

  constructor(public db: PrismaClient) {}

  async getById(id: string): Promise<Role | null> {
    return this.db.role.findUnique({ where: { id } });
  }

  async getAll(props: Pagination): Promise<Role[]> {
    return this.db.role.findMany({
      take: props.limit,
      skip: props.offset,
    });
  }
}

export default RoleRepository;
