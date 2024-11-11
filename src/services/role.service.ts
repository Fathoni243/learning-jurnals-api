import RoleRepository from "../repositories/role.repository";
import { Pagination } from "../types/common";

export class RoleService {
  name = "roleService";
  roleRepository: RoleRepository;

  constructor(ctx: { repositories: { roleRepository: RoleRepository } }) {
    this.roleRepository = ctx.repositories.roleRepository;
  }

  async getRoles(props: Pagination) {
    props.limit = Number(props.limit ?? 10);
    props.offset = Number(props.offset ?? 0);

    return this.roleRepository.getAll(props);
  }
}

export default RoleService;