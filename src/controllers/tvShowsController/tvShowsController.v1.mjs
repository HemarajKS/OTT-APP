import { readFile } from "fs/promises";
import {
  groupByGenre,
  sanitizeResponse,
} from "../../utils/sanitizeResponse.js";
import { config_v1 } from "../../config/config.v1.js";
import { componentTypes } from "../../../assets/constants/constants.js";

const strings = JSON.parse(
  await readFile(new URL("../../../assets/data/tvShows.json", import.meta.url))
);

const tvShowsJson = JSON.parse(
  await readFile(new URL("../../../assets/data/tvShows.json", import.meta.url))
);

const tvShowsPageJSON = JSON.parse(
  await readFile(
    new URL("../../../assets/data/pages/movies.json", import.meta.url)
  )
);

export const tvShowsPage = (req, res) => {
  try {
    const groupedByGenre = groupByGenre(tvShowsJson);

    const generatedData = Object.values(groupedByGenre);

    const data = {
      meta: { ...config_v1 },
      curation: {
        ...tvShowsPageJSON,
        packages: [
          {
            packageType: componentTypes.TV_SHOWS,
            title: strings.tvShows,
            description: strings.tvShowsRails,
            items: {
              // packageType: componentTypes.TV_SHOWS,
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
    res.status(500).json({ status: 500, message: strings.internalServerError });
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
    res.status(500).json({ status: 500, message: strings.internalServerError });
  }
};

export const getTvShowById = (req, res) => {
  try {
    const tvShowId = req.params.id;

    const show = tvShowsJson.find((show) => show._id.$oid === tvShowId);

    if (show) {
      res.json({ data: show });
    } else {
      res.status(404).json({ error: strings.tvShowsNotFound });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: strings.internalServerError });
  }
};
