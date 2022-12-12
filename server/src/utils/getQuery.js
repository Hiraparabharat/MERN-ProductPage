module.exports = (query) => {
  let queryObj = {};
  if (query?.search) {
    queryObj.$text = { $search: query.search };
  }
  if (query?.category) {
    queryObj.category = query?.category;
  }

  return queryObj;
};
