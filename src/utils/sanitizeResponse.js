import { componentTypes, constants } from "../../assets/constants/constants.js";
import { readFile } from "fs/promises";

const strings = JSON.parse(
  await readFile(new URL("../../assets/strings/strings.json", import.meta.url))
);

export const sanitizeResponse = (input) => {
  if (Array.isArray(input)) {
    return input.map((item, i) => ({
      id: item?._id?.$oid,
      type: item.contentType,
      image: {
        url: item.poster,
        altText: item.name,
        format: item?.format,
      },
      videoUrl: item?.videoUrl,
      title: item.name,
      description: item.description,
      target: {
        path: `${
          { [constants.MOVIE]: "movies", [constants.TV_SERIES]: "tv-shows" }[
            item.contentType
          ]
        }/${item?._id?.$oid}`,
      },
    }));
  } else if (typeof input === "object") {
    return {
      id: input?._id?.$oid,
      type: input.contentType,
      image: {
        url: input.poster,
        altText: input.name,
        format: input?.format,
      },
      videoUrl: input?.videoUrl,
      title: input.name,
      description: input.description,
      target: {
        path: `${input.contentType?.toLowerCase()}/${input?._id?.$oid}`,
      },
    };
  } else {
    throw new Error(strings.invalidInputArray);
  }
};

export const groupByGenre = (movies) => {
  return movies.reduce((acc, movie) => {
    const genre = movie.genre;
    if (!acc[genre]) {
      acc[genre] = {
        packageType: componentTypes.RAILS,
        title: genre,
        description: `${strings.thisIsRailWith} ${genre}`,
        items: {
          packageType: componentTypes.RAILS,
          contents: [],
        },
      };
    }
    acc[genre].items.contents.push({
      ...sanitizeResponse(movie),
      // packageType: componentTypes.CAROUSEL_CARD,
    });

    return acc;
  }, {});
};
