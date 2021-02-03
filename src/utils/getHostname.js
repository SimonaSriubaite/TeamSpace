export const getHostname = (url) => {
  let updatedURL = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
  updatedURL = updatedURL.replace(/\/$/, "");
  return updatedURL;
};
