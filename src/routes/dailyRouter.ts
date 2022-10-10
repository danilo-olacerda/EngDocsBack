import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware";
import validateToken from "../middlewares/validateTokenMiddleware";
import * as dailyController from "../controllers/dailyController";
import { dailyPartSchema } from "../schemas/dailyPartSchema";
import { buildDailyPartSchema } from "../schemas/buildDailyPartSchema";

const router = Router();

router.post("/dailyPart", validateToken, validateSchemaMiddleware(dailyPartSchema), dailyController.createDailyPart);
router.get("/dailyPart", validateToken, dailyController.getDailyParts);
router.get("/dailyPart/:id", validateToken, dailyController.getDailyPartById);

router.post("/buildDailyPart", validateToken, validateSchemaMiddleware(buildDailyPartSchema), dailyController.createBuildDailyPart);
router.get("/buildDailyPart", validateToken, dailyController.getBuildDailyParts);
router.get("/buildDailyPart/:id", validateToken, dailyController.getBuildDailyPartById);
router.delete("/buildDailyPart/:id", validateToken, dailyController.deleteBuildDailyPart);

export default router;