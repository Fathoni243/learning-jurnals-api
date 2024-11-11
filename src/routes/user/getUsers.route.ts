import { Router } from "express";
import { BaseRequest, BaseResponse } from "../../types/common";
import { UserService } from "../../services/user.service";
import errorHandler from "../../helpers/errorHandler";
import isAdmin from "../../middlewares/isAdminMiddleware";

const router = Router();

export const handler = async (req: BaseRequest<{ userService: UserService }>, res: BaseResponse) => {
  try {
    const {
      services: { userService },
    } = req.app;
    const { limit, offset, search } = req.query;

    const result = await userService.getAllUsers({ limit, offset, search });

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
 * /users:
 *   get:
 *     summary: Get All User
 *     description: Get All User for Role Admin
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
 *       - in: query
 *         name: limit
 *         schema:
 *           type: int
 *         required: false
 *         description: Maximum amount of data taken.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: int
 *         required: false
 *         description: The amount of data that will be skipped at the beginning.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Search by fullname or email.
 *     responses:
 *       200:
 *         description: Get Users successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       email:
 *                         type: string
 *                       fullname:
 *                         type: string
 *                       role_id:
 *                         type: string
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
const getUsersRoute = router.get("/users", isAdmin, handler as any);

export default getUsersRoute;
