import icons from "./icons";
import stemString from "./stem";
import { categoriesToSelectOptions, sortCategory } from "./category";

export { icons, stemString, sortCategory, categoriesToSelectOptions };

export const formatMoney = (n: number): string => {
  const str = n % 1 === 0 ? n.toString() : n.toFixed(2);
  return Number(str).toLocaleString("en");
};
