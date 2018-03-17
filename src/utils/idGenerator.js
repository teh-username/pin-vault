const generateId = (length = 6) =>
  Math.random()
    .toString(36)
    .substring(length - 1);

export default generateId;
