import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware";
import validateToken from "../middlewares/validateTokenMiddleware";
import * as dailyController from "../controllers/dailyController";
import { dailyPartSchema } from "../schemas/dailyPartSchema";

const router = Router();

router.post("/dailyPart", validateToken, validateSchemaMiddleware(dailyPartSchema), dailyController.createDailyPart);
router.get("/dailyPart", validateToken, dailyController.getDailyParts);
router.get("/dailyPart/:id", validateToken, dailyController.getDailyPartById);

router.post("/buildDailyPart", validateToken);
router.get("/buildDailyPart", validateToken);

export default router;