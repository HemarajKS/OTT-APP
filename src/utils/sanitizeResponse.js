export const sanitizeResponse = (inputArray) => {
  return inputArray.map((item, i) => ({
    id: item._id.$oid,
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
      path: `${item.contentType.toLowerCase()}/${item._id.$oid}`,
    },
  }));
};
