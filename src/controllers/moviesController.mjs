import { readFile } from "fs/promises";

const moviesJSON = JSON.parse(
  await readFile(new URL("../../assets/data/movies.json", import.meta.url))
);

export const mapArrayToCustomFields = (inputArray) => {
  return inputArray.map((item, i) => ({
    id: item._id.$oid,
    type: "movie",
    backgroundImage: {
      url: item.posterurl,
      altText: item.title,
    },
    title: item.title,
    synopsis: item.synopsis,
  }));
};

export const getMovies = (req, res) => {
  const responseData = mapArrayToCustomFields(moviesJSON);
  try {
    res.json({ data: responseData });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};
