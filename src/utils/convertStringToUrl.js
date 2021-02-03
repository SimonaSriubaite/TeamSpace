export const convertStringToUrl = (str) => {
  const stringForUrl = str.replace(/\s+/g, "-").toLowerCase();

  return stringForUrl;
};
