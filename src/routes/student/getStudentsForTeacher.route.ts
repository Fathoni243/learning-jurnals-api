import { Router } from "express";
import { BaseRequest, BaseResponse } from "../../types/common";
import errorHandler from "../../helpers/errorHandler";
import StudentService from "../../services/student.service";

const router = Router();

export const handler = async (req: BaseRequest<{ studentService: StudentService }>, res: BaseResponse) => {
  try {
    const {
      services: { studentService },
    } = req.app;
    const { limit, offset, search } = req.query;
    const { id } = req.headers.user as any;

    const result = await studentService.getStudentsForTeacher({ limit, offset, search }, id);

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
 * /students:
 *   get:
 *     summary: Get All Student for Role Teacher
 *     description: Get all Student for Role Teacher
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
const getStudentsForTeachersRoute = router.get("/students", handler as any);

export default getStudentsForTeachersRoute;
