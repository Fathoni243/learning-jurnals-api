import { Router } from "express";
import { BaseRequest, BaseResponse } from "../../types/common";
import errorHandler from "../../helpers/errorHandler";
import isAdmin from "../../middlewares/isAdminMiddleware";
import { SubjectService } from "../../services/subject.service";

const router = Router();

export const handler = async (req: BaseRequest<{ subjectService: SubjectService }>, res: BaseResponse) => {
  try {
    const { name, description, classId } = req.body;
    const {
      services: { subjectService },
    } = req.app;

    const result = await subjectService.createSubject({ name, description, classId } as any);

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
 * /subjects:
 *   post:
 *     summary: Create Subject
 *     description: Create a Subject for Role Admin
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *                 required: false
 *               classId:
 *                 type: string
 *                 required: true
 *     responses:
 *       201:
 *         description: Success Create Subject
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
const createSubjectRoute = router.post("/subjects", isAdmin, handler as any);

export default createSubjectRoute;
