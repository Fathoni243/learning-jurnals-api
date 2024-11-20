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
    const { learningJournalId, studentId, description } = req.body;
    const {
      services: { studentAbsentService },
    } = req.app;

    const result = await studentAbsentService.createAbsent({
      learningJournalId,
      studentId,
      description,
    } as any)

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
 * /student-absent:
 *   post:
 *     summary: Create Student Absent
 *     description: Create a Student Absent for Role Teacher
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               learningJournalId:
 *                 type: string
 *                 required: true
 *               studentId:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *                 required: false
 *     responses:
 *       201:
 *         description: Success Create Student Absent
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
const createStudentAbsentRoutes = router.post("/student-absent", handler as any);

export default createStudentAbsentRoutes;
