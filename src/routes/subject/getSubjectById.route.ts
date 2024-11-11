import { Router } from "express";
import { BaseRequest, BaseResponse } from "../../types/common";
import errorHandler from "../../helpers/errorHandler";
import isAdmin from "../../middlewares/isAdminMiddleware";
import { SubjectService } from "../../services/subject.service";

const router = Router();

export const handler = async (req: BaseRequest<{ subjectService: SubjectService }>, res: BaseResponse) => {
  try {
    const { id } = req.params as any;
    const {
      services: { subjectService },
    } = req.app;

    const result = await subjectService.getSubject(id);

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
 * /subjects/{id}:
 *   get:
 *     summary: Get Subject
 *     description: Get a Subject for Role Admin
 *     tags:
 *       - Subject
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
 *         description: ID of the subject to retrieve
 *     responses:
 *       200:
 *         description: Success Get Subject
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
 *                     classId:
 *                       type: string
 *                     class:
 *                       type: Object
 *                       properties:
 *                         id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         description:
 *                           type: string
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
const getSubjectRoute = router.get("/subjects/:id", isAdmin, handler as any);

export default getSubjectRoute;
