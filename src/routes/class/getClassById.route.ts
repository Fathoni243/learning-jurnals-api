import { Router } from "express";
import { BaseRequest, BaseResponse } from "../../types/common";
import ClassService from "../../services/class.service";
import errorHandler from "../../helpers/errorHandler";
import isAdmin from "../../middlewares/isAdminMiddleware";

const router = Router();

export const handler = async (req: BaseRequest<{ classService: ClassService }>, res: BaseResponse) => {
  try {
    const { id } = req.params as any;
    const {
      services: { classService },
    } = req.app;

    const result = await classService.getClassById(id);

    res.json({
      message: "ok",
      data: result
    })
  } catch (error) {
    errorHandler(error, res);
  }
};

/**
 * @swagger
 * /class/{id}:
 *   get:
 *     summary: Get Class By Id
 *     description: Get a Class for Role Admin
 *     tags:
 *       - Class
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
 *         description: Success Get Class
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
 *                     name:
 *                       type: string
 *                     description:
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

const getClassRoute = router.get("/class/:id", isAdmin, handler as any);

export default getClassRoute;
