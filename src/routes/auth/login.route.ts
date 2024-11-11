import { Router } from "express";

import errorHandler from "../../helpers/errorHandler";
import { BaseRequest, BaseResponse } from "../../types/common";

const router = Router();

export const handler = async (req: BaseRequest, res: BaseResponse) => {
  try {
    const { email, password } = req.body;
    const {
      services: { authService },
    } = req.app;

    const result = await authService.login(email, password);

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
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Retreive JWT token for user login succesfully
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Login successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                 roleId:
 *                   type: integer
 *                   description: Role ID for the user
 *       401:
 *         description: Unauthorized
 */
const postLoginRouter = router.post("/auth/login", handler as any);

export default postLoginRouter;
