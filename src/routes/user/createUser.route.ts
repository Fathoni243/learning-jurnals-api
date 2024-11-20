import { Router } from "express";
import { BaseRequest, BaseResponse } from "../../types/common";
import { UserService } from "../../services/user.service";
import errorHandler from "../../helpers/errorHandler";
import isAdmin from "../../middlewares/isAdminMiddleware";

const router = Router();

export const handler = async (req: BaseRequest<{ userService: UserService }>, res: BaseResponse) => {
  try {
    const { email, password, fullName, roleId, classId } = req.body;
    const {
      services: { userService },
    } = req.app;

    const result = await userService.createUser({ email, password, fullName, roleId, classId } as any);

    res.status(201).json({
      message: "ok",
      data: result,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create User
 *     description: Create a User for Role Admin
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: jwt
 *         schema:
 *           type: string
 *           example: jwt
 *         required: true
 *         description: user login access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *               fullName:
 *                 type: string
 *                 required: true
 *               roleId:
 *                 type: string
 *                 required: true
 *               classId:
 *                 type: string
 *                 required: false
 *     responses:
 *       201:
 *         description: Success Create User
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     fullName:
 *                       type: string
 *                     roleId:
 *                       type: string
 *                     classId:
 *                       type: string
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
const createUserRoute = router.post("/users", isAdmin, handler as any);

export default createUserRoute;
