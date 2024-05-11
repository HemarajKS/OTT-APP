import express from "express";
import {
  getMovieById,
  getMovies,
  getMoviesHome,
} from "../controllers/moviesController.mjs";

const router = express.Router();

router.get("/all", getMovies);
router.get("/home", getMoviesHome);
router.get("/:id", getMovieById);

export default router;
