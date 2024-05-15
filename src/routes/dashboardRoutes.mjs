import express from "express";
import { getDashboardData } from "../controllers/dashboardController/dashboardController.v1.mjs";

const router = express.Router();

router.get("/", getDashboardData);

export default router;
