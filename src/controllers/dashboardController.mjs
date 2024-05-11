import { sanitizeResponse } from "../utils/sanitizeResponse.js";
import { readFile } from "fs/promises";

const getData = async (filePath) => {
  const jsonData = JSON.parse(
    await readFile(new URL(filePath, import.meta.url))
  );
  const sanitizedData = sanitizeResponse(jsonData) || [];
  const shuffledData = sanitizedData.sort(() => 0.5 - Math.random());
  return shuffledData.slice(0, 5);
};

export const getDashboardData = async (req, res) => {
  try {
    const moviesData = (await getData("../../assets/data/movies.json")) || [];
    const tvShowsData = (await getData("../../assets/data/tvShows.json")) || [];

    return res.json({
      data: [
        { type: "movies", data: moviesData },
        { type: "tv-shows", data: tvShowsData },
      ],
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};
