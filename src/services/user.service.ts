import { User } from "@prisma/client";
import UserRepository from "../repositories/user.repository";
import throwIfMissing from "../helpers/throwIfMissing";
import throwIfNotEmail from "../helpers/throwIfNotEmail";
import { RoleRepository } from "../repositories/role.repository";
import { Error400 } from "../errors/http.errors";
import { v7 as uuidv7 } from "uuid";
import config from "../config";
import bcrypt from "bcrypt";
import { Pagination, Search } from "../types/common";
import ClassRepository from "../repositories/class.repository";

export class UserService {
  name = "userService";
  userRepository: UserRepository;
  roleRepository: RoleRepository;
  classRepository: ClassRepository;

  constructor(ctx: {
    repositories: {
      userRepository: UserRepository;
      roleRepository: RoleRepository;
      classRepository: ClassRepository;
    };
  }) {
    this.userRepository = ctx.repositories.userRepository;
    this.roleRepository = ctx.repositories.roleRepository;
    this.classRepository = ctx.repositories.classRepository;
  }

  async createUser(data: User) {
    throwIfMissing(data.email, "email is required!", 400);
    throwIfNotEmail(data.email, "Invalid email format!", 400);
    throwIfMissing(data.password, "password is required!", 400);
    throwIfMissing(data.fullName, "fullName is required!", 400);
    throwIfMissing(data.roleId, "roleId is required!", 400);

    const checkEmail = await this.userRepository.findUserByEmail(data.email);
    if (checkEmail) {
      throw new Error400({ message: "Email already exists" });
    }

    const checkRole = await this.roleRepository.getById(data.roleId);
    throwIfMissing(checkRole, "Role not found", 404);
    
    if (data.classId) {
      const checkClass = await this.classRepository.findClassById(data.classId!);
      throwIfMissing(checkClass, "Class not found", 404);
    }

    data.id = uuidv7();
    data.password = await bcrypt.hash(data.password!, parseInt(config.salt));

    return this.userRepository.createUser(data);
  }

  async getUserById(id: string) {
    throwIfMissing(id, "Id is required!", 400);

    const checkUser = await this.userRepository.findUserById(id);
    throwIfMissing(checkUser, "User not found", 404);

    return this.userRepository.findUserById(id);
  }

  async getAllUsers(props: Pagination & Search) {
    props.limit = Number(props.limit ?? 10);
    props.offset = Number(props.offset ?? 0);
    props.search = props.search ?? "";

    return this.userRepository.findUsers(props);
  }

  async updateUser(id: string, data: Partial<User>) {
    throwIfMissing(id, "Id is required!", 400);

    const checkUser = await this.userRepository.findUserById(id);
    throwIfMissing(checkUser, "User not found", 404);

    if (data.email && data.email !== checkUser!.email) {
      const checkEmail = await this.userRepository.findUserByEmail(data.email);
      if (checkEmail && checkEmail.id !== id) {
        throw new Error400({ message: "Email already exists" });
      }
    }

    if (data.roleId) {
      const checkRole = await this.roleRepository.getById(data.roleId);
      throwIfMissing(checkRole, "Role not found", 404);
    }

    if (data.classId) {
      const checkClass = await this.classRepository.findClassById(data.classId);
      throwIfMissing(checkClass, "Class not found", 404);
    }

    if (data.password && !(await bcrypt.compare(checkUser!.password, data.password))) {
      data.password = await bcrypt.hash(data.password, parseInt(config.salt));
    }

    return this.userRepository.updateUser(id, data);
  }

  async deleteUser(id: string) {
    throwIfMissing(id, "Id is required!", 400);

    const checkUser = await this.userRepository.findUserById(id);
    throwIfMissing(checkUser, "User not found", 404);

    return this.userRepository.deleteUser(id);
  }
}

export default UserService;
