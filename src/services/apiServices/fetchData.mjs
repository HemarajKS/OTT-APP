import axios from "axios";
import { readFile } from "fs/promises";

const strings = JSON.parse(
  await readFile(
    new URL("../../../assets/strings/strings.json", import.meta.url)
  )
);

export const fetchData = async (baseURL, endpoint, apiKey) => {
  try {
    const response = await axios.get(`${baseURL}${endpoint}`, {
      headers: {
        authorization: `bearer ${apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
