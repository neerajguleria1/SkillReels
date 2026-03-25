import { Router, Response } from "express";
import { registerController, loginController } from "../controllers/auth.controller"
import { authMiddleware, AuthenticatedRequest } from "../middleware/auth.middleware"
const router = Router()

router.post('/login',loginController )
router.post('/register',registerController)
router.get('/me', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  res.json(req.user)
})

export default router