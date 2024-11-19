import { Router } from "express";
import { BaseRequest, BaseResponse } from "../../types/common";
import errorHandler from "../../helpers/errorHandler";
import LearningJournalService from "../../services/learningJournal.service";

const router = Router();

export const handler = async (
  req: BaseRequest<{ learningJournalService: LearningJournalService }>,
  res: BaseResponse
) => {
  try {
    const {
      services: { learningJournalService },
    } = req.app;
    const { limit, offset, search } = req.query;
    const { id } = req.params as any;

    const result = await learningJournalService.getLearningJournals({ limit, offset, search }, id);

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
 * /subject/{id}/learning-journal:
 *   get:
 *     summary: Get all Learning Journal
 *     description: Get all Learning Journal for Role Teacher
 *     tags:
 *       - Learning Journal
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
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: ID of the subject to retrieve
 *     responses:
 *       200:
 *         description: Success Get Learning Journals
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
 *                     subjectId:
 *                       type: string
 *                     date:
 *                       type: string
 *                     learningMaterial:
 *                       type: string
 *                     learningActivity:
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
const getLearningJournalsRoutes = router.get("/subject/:id/learning-journal", handler as any);

export default getLearningJournalsRoutes;
