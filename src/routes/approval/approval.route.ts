import { Router } from "express";
import { BaseRequest, BaseResponse } from "../../types/common";
import errorHandler from "../../helpers/errorHandler";
import LearningJournalService from "../../services/learningJournal.service";
import isAdmin from "../../middlewares/isAdminMiddleware";

const router = Router();

export const handler = async (
  req: BaseRequest<{ learningJournalService: LearningJournalService }>,
  res: BaseResponse
) => {
  try {
    const { status, description } = req.body;
    const {
      services: { learningJournalService },
    } = req.app;
    const { id } = req.params as any;

    const result = await learningJournalService.approveLearningJournal(id, {
      status,
      description,
    });

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
 * /approval/{id}:
 *   put:
 *     summary: Approval Learning Journal
 *     description: Approval Learning Journal for Role Admin
 *     tags:
 *       - Approval
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
 *         description: ID of the approval to retrieve
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 required: false
 *               description:
 *                 type: string
 *                 required: false
 *     responses:
 *       200:
 *         description: Success Approval Learning Journal
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
 *                     status:
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
const approvalJournalRoutes = router.put("/approval/:id", isAdmin, handler as any);

export default approvalJournalRoutes;
