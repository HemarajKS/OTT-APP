import { config_v1 } from "../../config/config.v1.js";
import { sanitizeResponse } from "../../utils/sanitizeResponse.js";
import { readFile } from "fs/promises";

const homeData = JSON.parse(
  await readFile(
    new URL("../../../assets/data/pages/home.json", import.meta.url)
  )
);

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
    const moviesData =
      (await getData("../../../assets/data/movies.json")) || [];
    const tvShowsData =
      (await getData("../../../assets/data/tvShows.json")) || [];

    const data = {
      meta: { ...config_v1 },
      curation: {
        ...homeData,
        packages: [
          {
            packageType: "Movies",
            title: "Drama",
            description: "This is the rail with Drama",
            items: {
              packageType: "CarouselItems",
              cta: "See All",
              contents: moviesData.map((movie) => ({
                ...movie,
                packageType: "CarouselCard",
              })),
            },
          },
          {
            packageType: "TVShows",
            title: "TV Shows",
            description: "This is the rail with TV shows",
            cta: "See All",
            items: {
              packageType: "CarouselItems",
              contents: tvShowsData.map((show) => ({
                ...show,
                packageType: "CarouselCard",
              })),
            },
          },
        ],
      },
    };

    return res.json(data);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};