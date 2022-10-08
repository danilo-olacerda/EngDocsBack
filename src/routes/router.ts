import { Router } from "express";
import authRouter from "./authRouter";
import dailyRouter from "./dailyRouter";

const router = Router();

router.use(authRouter);
router.use(dailyRouter);

export default router;