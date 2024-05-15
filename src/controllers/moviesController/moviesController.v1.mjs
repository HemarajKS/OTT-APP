import { readFile } from "fs/promises";
import { sanitizeResponse } from "../../utils/sanitizeResponse.js";

const moviesJSON = JSON.parse(
  await readFile(new URL("../../../assets/data/movies.json", import.meta.url))
);

export const getMovies = (req, res) => {
  const responseData = sanitizeResponse(moviesJSON) || [];
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

export const getMoviesHome = (req, res) => {
  const data = sanitizeResponse(moviesJSON) || [];
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

export const getMovieById = (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = moviesJSON.find((movie) => movie._id.$oid === movieId);

    if (movie) {
      res.json({ data: movie });
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};
