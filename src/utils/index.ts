import icons, { Icon } from "./icons";
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
  return categories.map(({ title, parentTitle, icon }) => ({
    displayText: title,
    value: title,
    icon: icons[icon as Icon],
    nested: Boolean(parentTitle),
  }));
};
