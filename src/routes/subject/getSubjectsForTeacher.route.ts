import { Router } from "express";
import { BaseRequest, BaseResponse } from "../../types/common";
import errorHandler from "../../helpers/errorHandler";
import { SubjectService } from "../../services/subject.service";

const router = Router();

export const handler = async (req: BaseRequest<{ subjectService: SubjectService }>, res: BaseResponse) => {
  try {
    const {
      services: { subjectService },
    } = req.app;
    const { limit, offset, search } = req.query;
    const { id } = req.headers.user as any;

    const result = await subjectService.getSubjectsForTeacher({ limit, offset, search }, id);

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
 * /subjects:
 *   get:
 *     summary: Get All Subject for Role Teacher
 *     description: Get a Subject for Role Teacher
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
 *         description: Search by name.
 *     responses:
 *       200:
 *         description: Success Get Subjects
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
 *                       classId:
 *                         type: string
 *                       class:
 *                         type: Object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           description:
 *                             type: string
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
 */
const getSubjectsForTeachersRoute = router.get("/subjects", handler as any);

export default getSubjectsForTeachersRoute;
