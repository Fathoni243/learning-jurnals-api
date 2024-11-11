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

    await classService.deleteClass(id);

    res.json({
      message: "ok",
      data: "",
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

/**
 * @swagger
 * /class/{id}:
 *   delete:
 *     summary: Delete Class By Id
 *     description: Delete a Class for Role Admin
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
 *         description: Success Get User
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: string
 *                   example: ""
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

const deleteClassRoute = router.delete("/class/:id", isAdmin, handler as any);

export default deleteClassRoute;
