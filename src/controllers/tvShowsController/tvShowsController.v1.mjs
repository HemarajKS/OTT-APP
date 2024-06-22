import { readFile } from "fs/promises";
import { fetchDataFromStrapi } from "../../services/strapiServices/strapiService.mjs";
import { API_PATH } from "../../../assets/constants/apis.mjs";

const strings = JSON.parse(
  await readFile(
    new URL("../../../assets/strings/strings.json", import.meta.url)
  )
);

export const tvShowsPage = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;

    const queryParams = [];
    if (skip !== null) queryParams.push(`skip=${skip}`);
    if (limit !== null) queryParams.push(`limit=${limit}`);

    const data = await fetchDataFromStrapi(
      `${API_PATH.TV_SERIES}&${queryParams.join("&")}`
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ status: 500, message: strings.internalServerError });
  }
};
