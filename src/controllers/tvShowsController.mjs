import { readFile } from "fs/promises";
import { sanitizeResponse } from "../utils/sanitizeResponse.js";

const tvShowsJson = JSON.parse(
  await readFile(new URL("../../assets/data/tvShows.json", import.meta.url))
);

export const getTvShows = (req, res) => {
  const responseData = sanitizeResponse(tvShowsJson) || [];
  try {
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    if (!isNaN(limit) && !isNaN(skip)) {
      const paginatedData = responseData.slice(skip, skip + limit);
      return res.json({
        data: paginatedData,
        totalLength: responseData.length,
      });
    } else {
      return res.json({ data: responseData });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

export const getTvShowsHome = (req, res) => {
  const data = sanitizeResponse(tvShowsJson) || [];
  const shuffled = data.sort(() => 0.5 - Math.random());
  const responseData = shuffled.slice(0, 5);

  try {
    return res.json({
      data: responseData,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

export const getTvShowById = (req, res) => {
  try {
    const tvShowId = req.params.id;

    const show = tvShowsJson.find((show) => show._id.$oid === tvShowId);

    if (show) {
      res.json({ data: show });
    } else {
      res.status(404).json({ error: "TV Show not found" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};
