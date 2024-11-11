import { Router } from "express";
import { BaseRequest, BaseResponse } from "../../types/common";
import { UserService } from "../../services/user.service";
import errorHandler from "../../helpers/errorHandler";
import isAdmin from "../../middlewares/isAdminMiddleware";

const router = Router();

export const handler = async (req: BaseRequest<{ userService: UserService }>, res: BaseResponse) => {
  try {
    const { id } = req.params as any;
    const {
      services: { userService },
    } = req.app;

    const result = await userService.getUserById(id);

    res.json({
      message: "ok",
      data: {
        id: result!.id,
        email: result!.email,
        fullName: result!.fullName,
        roleId: result!.roleId,
      },
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get User By Id
 *     description: Get a User for Role Admin
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
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: ID of the user to retrieve
 *     responses:
 *       200:
 *         description: Success Get User
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
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     fullName:
 *                       type: string
 *                     roleId:
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
const getUserRoute = router.get("/users/:id", isAdmin, handler as any);

export default getUserRoute;
