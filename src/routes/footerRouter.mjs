import express from "express";
import { getFooter } from "../controllers/footerController/footerController.mjs";
const router = express.Router();

router.get("/", getFooter);

export default router;
