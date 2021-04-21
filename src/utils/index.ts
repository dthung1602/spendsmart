import icons, { IconName } from "./icons";
import type { Category } from "../database";
import type { VerticalScrollSelectOptionValue } from "../components";

export { icons };

export const formatMoney = (n: number): string => {
  const str = n % 1 === 0 ? n.toString() : n.toFixed(2);
  return Number(str).toLocaleString("en");
};

export const categoriesToSelectOptions = (
  categories: Category[]
): VerticalScrollSelectOptionValue<string>[] => {
  categories.sort((cat1, cat2) => {
    const s1 = (cat1.parentTitle || "") + cat1.title;
    const s2 = (cat2.parentTitle || "") + cat2.title;
    return s1 > s2 ? 1 : s1 < s2 ? -1 : 0;
  });

  return categories.map(({ title, parentTitle, icon }) => ({
    displayText: title,
    value: title,
    icon: icons[icon as IconName],
    nested: Boolean(parentTitle),
  }));
};
