import { Router } from "express";
import { BaseRequest, BaseResponse } from "../../types/common";
import StudentService from "../../services/student.service";
import errorHandler from "../../helpers/errorHandler";
import isAdmin from "../../middlewares/isAdminMiddleware";

const router = Router();

export const handler = async (req: BaseRequest<{ studentService: StudentService }>, res: BaseResponse) => {
  try {
    const { id } = req.params as any;
    const {
      services: { studentService },
    } = req.app;

    const result = await studentService.getStudent(id);

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
 * /students/{id}:
 *   get:
 *     summary: Get Student
 *     description: Get a Student for Role Admin
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
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: ID of the subject to retrieve
 *     responses:
 *       200:
 *         description: Success Get Student
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

const getStudentRoute = router.get("/students/:id", isAdmin, handler as any);

export default getStudentRoute;
