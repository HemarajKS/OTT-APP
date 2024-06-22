import { readFile } from "fs/promises";
import { fetchData } from "../apiServices/fetchData.mjs";

const strings = JSON.parse(
  await readFile(
    new URL("../../../assets/strings/strings.json", import.meta.url)
  )
);

export const fetchDataFromStrapi = async (endpoint) => {
  const baseURL = process.env.STRAPI_URL;
  const apiKey = process.env.STRAPI_API_SECRET;

  try {
    return await fetchData(baseURL, endpoint, apiKey);
  } catch (error) {
    console.log(error);
    throw new Error(strings.strapiError);
  }
};
