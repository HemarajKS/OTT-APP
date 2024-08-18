import { readFile } from "fs/promises";
import { fetchDataFromStrapi } from "../../services/strapiServices/strapiService.mjs";
import { API_PATH } from "../../../assets/constants/apis.mjs";
import { features } from "process";

const strings = JSON.parse(
  await readFile(
    new URL("../../../assets/strings/strings.json", import.meta.url)
  )
);

export const getPlans = async (req, res) => {
  try {
    const { data } = await fetchDataFromStrapi(API_PATH.PLANS);

    const labels = data?.labels?.map((label) => {
      return {
        title: label.title,
        subTitle: label.subTitle,
      };
    });

    const plans = data?.plans?.map((plan) => {
      // Function to find the feature based on label_id
      const findFeatureByLabelId = (labelId) => {
        return plan?.features.find(
          (feature) => feature.subscription_label.label_id === labelId
        );
      };

      // Example usage
      const featureValues = data?.labels?.map((label) => {
        const feature = findFeatureByLabelId(label.label_id);
        return feature?.value;
      });

      return {
        id: plan?.plan_id,
        name: plan?.name,
        description: plan?.description,
        price: plan?.price,
        subscriptionPer: plan?.subscriptionPer,
        currency: plan?.currency,
        features: featureValues,
      };
    });

    const formattedData = {
      curation: data?.curation,
      meta: data?.meta,
      data: { labels, plans },
    };

    res.json({ data: formattedData });
  } catch (error) {
    res.status(500).json({ status: 500, message: strings.internalServerError });
  }
};
