import { Category } from "../database";
import { VerticalScrollSelectOptionValue } from "../components";
import icons, { IconName } from "./icons";

export const sortCategory = (categories: Category[]): Category[] => {
  return categories.sort((cat1, cat2) => {
    const s1 = (cat1.parentTitle || "") + cat1.title;
    const s2 = (cat2.parentTitle || "") + cat2.title;
    return s1 > s2 ? 1 : s1 < s2 ? -1 : 0;
  });
};

export const categoriesToSelectOptions = (
  categories: Category[]
): VerticalScrollSelectOptionValue<string>[] => {
  categories = sortCategory(categories);

  return categories.map(({ title, parentTitle, icon }) => ({
    displayText: title,
    value: title,
    icon: icons[icon as IconName],
    nested: Boolean(parentTitle),
  }));
};
