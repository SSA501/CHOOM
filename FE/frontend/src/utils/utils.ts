import { colorThemes } from "../constants/constants";

export const pickRandomColor = (): string => {
  const idx = Math.floor(Math.random() * colorThemes.length);
  return colorThemes[idx].name;
};
