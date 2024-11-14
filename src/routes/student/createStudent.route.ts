import { Router } from "express";
import { BaseRequest, BaseResponse } from "../../types/common";
import StudentService from "../../services/student.service";
import errorHandler from "../../helpers/errorHandler";
import isAdmin from "../../middlewares/isAdminMiddleware";

const router = Router();

export const handler = async (req: BaseRequest<{ studentService: StudentService }>, res: BaseResponse) => {
  try {
    const { name, gender, classId } = req.body;
    const {
      services: { studentService },
    } = req.app;

    const result = await studentService.createStudent({
      name,
      gender,
      classId,
    } as any);

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
 * /students:
 *   post:
 *     summary: Create Student
 *     description: Create a Student for Role Admin
 *     tags:
 *       - Student
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
 *               gender:
 *                 type: string
 *                 required: false
 *               classId:
 *                 type: string
 *                 required: true
 *     responses:
 *       201:
 *         description: Success Create Student
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
 *                     gender:
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

const createStudentRoutes = router.post("/students", isAdmin, handler as any);

export default createStudentRoutes;
