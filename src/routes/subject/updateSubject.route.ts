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
    const { name, description } = req.body;

    const result = await subjectService.updateSubject(id, { name, description });

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
 *   put:
 *     summary: Update Subject
 *     description: Update a Subject for Role Admin
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: false
 *               description:
 *                 type: string
 *                 required: false
 *     responses:
 *       200:
 *         description: Success Update Subject
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
const updateSubjectRoute = router.put("/subjects/:id", isAdmin, handler as any);

export default updateSubjectRoute;
