export const colorThemes: string[] = [
  "blue",
  "green",
  "yellow",
  "pink",
  "orange",
];

export const pickRandomColor = (): string => {
  const idx = Math.floor(Math.random() * colorThemes.length);
  return colorThemes[idx];
};
