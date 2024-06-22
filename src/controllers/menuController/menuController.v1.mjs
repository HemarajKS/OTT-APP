import { readFile } from "fs/promises";
import { fetchDataFromStrapi } from "../../services/strapiServices/strapiService.mjs";
import { API_PATH } from "../../../assets/constants/apis.mjs";

const strings = JSON.parse(
  await readFile(
    new URL("../../../assets/strings/strings.json", import.meta.url)
  )
);

export const getMenu = async (req, res) => {
  try {
    const data = await fetchDataFromStrapi(API_PATH.HEADER);
    res.json(data);
  } catch (error) {
    res.status(500).json({ status: 500, message: strings.internalServerError });
  }
};
