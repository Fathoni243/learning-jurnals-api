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
    const { limit, offset, search } = req.query;

    const result = await studentService.getStudents(
      {
        limit,
        offset,
        search,
      },
      id
    );

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
 * /class/{id}/students:
 *   get:
 *     summary: Get All Student
 *     description: Get All Student for Role Admin
 *     tags:
 *       - Student
 *     parameters:
 *       - in: header
 *         name: jwt
 *         schema:
 *           type: string
 *           example: jwt
 *         required: true
 *         description: student login access token.
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
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: ID of the class to retrieve
 *     responses:
 *       200:
 *         description: Get Users successfully
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
 *                       gender:
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

const getStudentsRoute = router.get("/class/:id/students", isAdmin, handler as any);

export default getStudentsRoute;
