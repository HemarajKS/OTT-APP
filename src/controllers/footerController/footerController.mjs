import { readFile } from "fs/promises";

const footerJSON = JSON.parse(
  await readFile(new URL("../../../assets/data/footer.json", import.meta.url))
);

const strings = JSON.parse(
  await readFile(
    new URL("../../../assets/strings/strings.json", import.meta.url)
  )
);

export const getFooter = (req, res) => {
  try {
    res.json({ data: footerJSON });
  } catch (error) {
    res.status(500).json({ status: 500, message: strings.internalServerError });
  }
};
