import { readFile } from "fs/promises";

const menuJSON = JSON.parse(
  await readFile(new URL("../../../assets/data/menu.json", import.meta.url))
);

const strings = JSON.parse(
  await readFile(
    new URL("../../../assets/strings/strings.json", import.meta.url)
  )
);

export const getMenu = (req, res) => {
  try {
    res.json({ data: menuJSON });
  } catch (error) {
    res.status(500).json({ status: 500, message: strings.internalServerError });
  }
};
