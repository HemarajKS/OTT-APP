export const sanitizeResponse = (input) => {
  if (Array.isArray(input)) {
    return input.map((item, i) => ({
      id: item?._id?.$oid,
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
        path: `${item.contentType?.toLowerCase()}/${item?._id?.$oid}`,
      },
    }));
  } else if (typeof input === "object") {
    return {
      id: input?._id?.$oid,
      type: input.contentType,
      image: {
        url: input.poster,
        altText: input.name,
        format: input?.format,
      },
      videoUrl: input?.videoUrl,
      title: input.name,
      description: input.description,
      target: {
        path: `${input.contentType?.toLowerCase()}/${input?._id?.$oid}`,
      },
    };
  } else {
    throw new Error("Invalid input type. Expected array or object.");
  }
};

export const groupByGenre = (movies) => {
  return movies.reduce((acc, movie) => {
    const genre = movie.genre;
    if (!acc[genre]) {
      acc[genre] = {
        packageType: "Rails",
        title: genre,
        description: `This is the rail with ${genre}`,
        items: {
          packageType: "Rails",
          contents: [],
        },
      };
    }
    acc[genre].items.contents.push({
      ...sanitizeResponse(movie),
      packageType: "CarouselCard",
    });

    return acc;
  }, {});
};
