import express from "express";
import { moviePage } from "../controllers/moviesController/moviesController.v1.mjs";

const router = express.Router();

router.get("/", moviePage);

export default router;
