import { Router } from "express";
import { submitIntake } from "../controllers/intake.controller";

const router = Router();

router.post("/", submitIntake);

export default router;
