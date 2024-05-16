import {
  componentTypes,
  constants,
} from "../../../assets/constants/constants.js";
import { config_v1 } from "../../config/config.v1.js";
import { sanitizeResponse } from "../../utils/sanitizeResponse.js";
import { readFile } from "fs/promises";

const strings = JSON.parse(
  await readFile(
    new URL("../../../assets/strings/strings.json", import.meta.url)
  )
);

const homeData = JSON.parse(
  await readFile(
    new URL("../../../assets/data/pages/home.json", import.meta.url)
  )
);

const faqData = JSON.parse(
  await readFile(new URL("../../../assets/data/faq.json", import.meta.url))
);

const heroData = JSON.parse(
  await readFile(new URL("../../../assets/data/hero.json", import.meta.url))
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
            packageType: componentTypes.RAILS,
            title: strings.movies,
            description: strings.moviesRails,
            items: {
              // packageType: componentTypes.CAROUSEL_ITEMS,
              cta: strings.seeAll,
              contents: moviesData.map((movie) => ({
                ...movie,
                // packageType: componentTypes.CAROUSEL_CARD,
              })),
            },
          },
          {
            packageType: componentTypes.RAILS,
            title: strings.tvShows,
            description: strings.tvShowsRails,
            cta: strings.seeAll,
            items: {
              // packageType: componentTypes.CAROUSEL_ITEMS,
              contents: tvShowsData.map((show) => ({
                ...show,
                // packageType: componentTypes.CAROUSEL_CARD,
              })),
            },
          },
          // {
          //   packageType: componentTypes.HERO,
          //   title: "",
          //   description: strings.heroContents,
          //   itemType: constants.STATIC,
          //   items: {
          //     packageType: componentTypes.HERO_CARD,
          //     contents: heroData,
          //   },
          // },
          ...heroData.map((heroData, i) => {
            return {
              packageType: componentTypes.HERO,
              title: "",

              items: {
                orientation: i % 2 === 0 ? constants.LEFT : constants.RIGHT,
                title: heroData.title,
                description: heroData.description,
                image: {
                  url: heroData.image,
                  altText: heroData.title,
                },
              },
            };
          }),
          {
            packageType: componentTypes.FAQ,
            title: strings.frequentlyAskedQues,
            description: strings.frequentlyAskedQues,
            itemType: constants.STATIC,
            items: {
              // packageType: componentTypes.ACCORDION,
              contents: faqData,
            },
          },
        ],
      },
    };

    return res.json(data);
  } catch (error) {
    res.status(500).json({ status: 500, message: strings.internalServerError });
  }
};
