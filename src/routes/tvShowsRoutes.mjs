import express from "express";
import { tvShowsPage } from "../controllers/tvShowsController/tvShowsController.v1.mjs";

const router = express.Router();

router.get("/", tvShowsPage);

export default router;
