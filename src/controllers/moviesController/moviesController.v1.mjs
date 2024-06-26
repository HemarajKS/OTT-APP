import { readFile } from "fs/promises";
import {
  groupByGenre,
  sanitizeResponse,
} from "../../utils/sanitizeResponse.js";
import { config_v1 } from "../../config/config.v1.js";
import { componentTypes } from "../../../assets/constants/constants.js";

const strings = JSON.parse(
  await readFile(
    new URL("../../../assets/strings/strings.json", import.meta.url)
  )
);

const moviesJSON = JSON.parse(
  await readFile(new URL("../../../assets/data/movies.json", import.meta.url))
);

const moviePageJSON = JSON.parse(
  await readFile(
    new URL("../../../assets/data/pages/movies.json", import.meta.url)
  )
);

export const moviePage = (req, res) => {
  try {
    const groupedByGenre = groupByGenre(moviesJSON);

    const generatedData = Object.values(groupedByGenre);

    const data = {
      meta: { ...config_v1 },
      curation: {
        ...moviePageJSON,
        packages: [
          {
            packageType: componentTypes.MOVIES,
            title: strings.movies,
            description: strings.moviesRails,
            items: {
              packageType: componentTypes.MOVIES,
              contents: generatedData,
            },
          },
        ],
      },
    };

    return res.json({
      ...data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: strings.internalServerError });
  }
};

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
    res.status(500).json({ status: 500, message: strings.internalServerError });
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
    res.status(500).json({ status: 500, message: strings.internalServerError });
  }
};

export const getMovieById = (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = moviesJSON.find((movie) => movie._id.$oid === movieId);

    if (movie) {
      res.json({ data: movie });
    } else {
      res.status(404).json({ error: strings.movieNotFound });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: strings.internalServerError });
  }
};
