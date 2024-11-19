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
    const { subjectId, date, learningMaterial, learningActivity, description } = req.body;
    const {
      services: { learningJournalService },
    } = req.app;
    const { id } = req.headers.user as any;

    const result = await learningJournalService.createLearningJournal({
      subjectId,
      date: new Date(date),
      learningMaterial,
      learningActivity,
      description,
      createdBy: id,
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
 * /learning-journal:
 *   post:
 *     summary: Create Learning Journal
 *     description: Create a Learning Journal for Role Teacher
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subjectId:
 *                 type: string
 *                 required: true
 *               date:
 *                 type: string
 *                 required: true
 *                 example: "2024-12-31"
 *               learningMaterial:
 *                 type: string
 *                 required: true
 *               learningActivity:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *                 required: false
 *     responses:
 *       201:
 *         description: Success Create Learning Journal
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
const createLearningJournalRoutes = router.post("/learning-journal", handler as any);

export default createLearningJournalRoutes;
