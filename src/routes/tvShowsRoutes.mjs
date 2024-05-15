import express from "express";
import {
  getTvShowById,
  getTvShows,
  getTvShowsHome,
} from "../controllers/tvShowsController/tvShowsController.v1.mjs";

const router = express.Router();

router.get("/all", getTvShows);
router.get("/home", getTvShowsHome);
router.get("/:id", getTvShowById);

export default router;
