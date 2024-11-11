import { Router } from "express";
import { BaseRequest, BaseResponse } from "../../types/common";
import errorHandler from "../../helpers/errorHandler";
import isAdmin from "../../middlewares/isAdminMiddleware";
import RoleService from "../../services/role.service";

const router = Router();

export const handler = async (req: BaseRequest<{ roleService: RoleService }>, res: BaseResponse) => {
  try {
    const {
      services: { roleService },
    } = req.app;
    const { limit, offset } = req.query;

    const result = await roleService.getRoles({ limit, offset });

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
 * /roles:
 *   get:
 *     summary: Get All Roles
 *     description: Get All Roles for Role Admin
 *     tags:
 *       - Role
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
 *     responses:
 *       200:
 *         description: Get Roles successfully
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
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
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
const getRolesRoute = router.get("/roles", isAdmin, handler as any);

export default getRolesRoute;
