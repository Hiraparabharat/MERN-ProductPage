module.exports = (query) => {
  if (query.sort) {
    return { [query.sort]: query.sortBy === "DESC" ? -1 : 1 };
  }
};
