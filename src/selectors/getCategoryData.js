import {createSelector} from "reselect";

const getCategories = (state) => state.categories.categories;
console.log(getCategories);

const getCategoryData = createSelector([getCategories], (categories) => {
  const categoryMap = {};
  categories.forEach((category) => {
    categoryMap[category.id] = category.name;
  });
  return categoryMap;
});

export default getCategoryData;
