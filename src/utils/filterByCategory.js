export const filterByCategory = (list, criteria) => {
  let filteredList = [];
  if (criteria === "all") {
    filteredList = [...list];
  } else {
    list.forEach((restaurant) => {
      restaurant.categories.forEach((category) => {
        category.toLowerCase() === criteria && filteredList.push(restaurant);
      });
    });
  }
  return filteredList;
};
