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
    const { name, gender } = req.body;

    const result = await studentService.updateStudent(id, { name, gender });

    res.json({
      message: "ok",
      data: result,
    })
  } catch (error) {
    errorHandler(error, res);
  }
};

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update Student
 *     description: Update a Student for Role Admin
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
 *         description: ID of the student to retrieve
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
 *               gender:
 *                 type: string
 *                 required: false
 *     responses:
 *       200:
 *         description: Success Update Student
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

const updateStudentRoute = router.put("/students/:id", isAdmin, handler as any);

export default updateStudentRoute;
