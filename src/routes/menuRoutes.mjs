import express from "express";
import { getMenu } from "../controllers/menuController/menuController.v1.mjs";

const router = express.Router();

router.get("/", getMenu);

export default router;
