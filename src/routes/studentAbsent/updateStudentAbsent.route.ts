import { Router } from "express";
import { BaseRequest, BaseResponse } from "../../types/common";
import errorHandler from "../../helpers/errorHandler";
import StudentAbsentService from "../../services/absent.service";

const router = Router();

export const handler = async (
  req: BaseRequest<{ studentAbsentService: StudentAbsentService }>,
  res: BaseResponse
) => {
  try {
    const { studentId, description } = req.body;
    const {
      services: { studentAbsentService },
    } = req.app;
    const { id } = req.params as any;

    const result = await studentAbsentService.updateAbsentById(id, {
      studentId,
      description,
    } as any)

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
 * /student-absent/{id}:
 *   put:
 *     summary: Update Student Absent
 *     description: Update a Student Absent for Role Teacher
 *     tags:
 *       - Student Absent
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
 *         description: ID of the student absent to retrieve
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *                 required: false
 *     responses:
 *       200:
 *         description: Success Update Student Absent
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
 *                     learningJournalId:
 *                       type: string
 *                     studentId:
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
 */
const updateStudentAbsentRoutes = router.put("/student-absent/:id", handler as any);

export default updateStudentAbsentRoutes;
