import express from "express";
import { getPlans } from "../controllers/subscriptionController/subscriptionController.mjs";
const router = express.Router();

router.get("/plans", getPlans);

export default router;
