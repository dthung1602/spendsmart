import { Category } from "../database";
import { VerticalScrollSelectOptionValue } from "../components";

export const sortCategory = (categories: Category[]): Category[] => {
  const idToTitleMapping = new Map<number | undefined, string>();
  for (const { id, title } of categories) {
    idToTitleMapping.set(id, title);
  }

  return categories.sort((cat1, cat2) => {
    const s1 = (idToTitleMapping.get(cat1.parentId) || "") + cat1.title;
    const s2 = (idToTitleMapping.get(cat2.parentId) || "") + cat2.title;
    return s1 > s2 ? 1 : s1 < s2 ? -1 : 0;
  });
};

export const categoriesToSelectOptions = (
  categories: Category[]
): VerticalScrollSelectOptionValue<number>[] => {
  categories = sortCategory(categories);

  return categories.map(({ id, title, parentId, icon }) => ({
    displayText: title,
    value: id,
    icon,
    nested: parentId !== undefined,
  }));
};
