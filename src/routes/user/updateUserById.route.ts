import { Router } from "express";
import { BaseRequest, BaseResponse } from "../../types/common";
import { UserService } from "../../services/user.service";
import errorHandler from "../../helpers/errorHandler";
import isAdmin from "../../middlewares/isAdminMiddleware";

const router = Router();

export const handler = async (req: BaseRequest<{ userService: UserService }>, res: BaseResponse) => {
  try {
    const { id } = req.params as any;
    const { password, fullName, roleId } = req.body;
    const {
      services: { userService },
    } = req.app;

    const result = await userService.updateUser(id, { password, fullName, roleId } as any);

    res.json({
      message: "ok",
      data: result,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update User By Id
 *     description: Update a User for Role Admin
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 required: false
 *               password:
 *                 type: string
 *                 required: false
 *               roleId:
 *                 type: string
 *                 required: false
 *     responses:
 *       200:
 *         description: Success Update User
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
const updateUserRoute = router.put("/users/:id", isAdmin, handler as any);

export default updateUserRoute;
