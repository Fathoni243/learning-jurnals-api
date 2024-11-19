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
    const { id } = req.params as any;

    const result = await learningJournalService.deleteLearningJournal(id);

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
 * /learning-journal/{id}:
 *   delete:
 *     summary: Delete Learning Journal
 *     description: Delete a Learning Journal for Role Teacher
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
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: ID of the learning journal to retrieve
 *     responses:
 *       200:
 *         description: Success Delete Learning Journal
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
const deleteLearningJournalRoutes = router.delete("/learning-journal/:id", handler as any);

export default deleteLearningJournalRoutes;
