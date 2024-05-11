export const sanitizeResponse = (inputArray) => {
  return inputArray.map((item, i) => ({
    id: item._id.$oid,
    type: item.contentType,
    backgroundImage: {
      url: item.poster,
      altText: item.name,
    },
    title: item.name,
    synopsis: item.description,
  }));
};
