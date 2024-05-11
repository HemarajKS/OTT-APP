import express from "express";
import { getMovies } from "../controllers/moviesController.mjs";

const router = express.Router();

router.get("/", getMovies);

export default router;
