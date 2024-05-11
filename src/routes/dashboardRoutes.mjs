import express from "express";
import { getDashboardData } from "../controllers/dashboardController.mjs";

const router = express.Router();

router.get("/", getDashboardData);

export default router;
