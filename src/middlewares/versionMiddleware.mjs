export const versionMiddleware = function (version) {
  return function (req, res, next) {
    if (semver.gte(req.headers["x-version"], version)) {
      return next();
    }
    return next("route"); // skip to the next route
  };
};
