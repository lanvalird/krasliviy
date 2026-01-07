import {
  ANSI_COLOR_BG_CODE,
  ANSI_COLOR_CODE,
  ANSI_RESET,
} from "../colors/index.js";

type ColorLists = typeof ANSI_COLOR_BG_CODE | typeof ANSI_COLOR_CODE;
type Colors = ColorLists[keyof ColorLists];

export function colorize(str: string, ...colors: Colors[]): string {
  let newString = str + ANSI_RESET;
  const revertedColors = colors.flat().reverse();
  revertedColors.forEach((color) => {
    newString = color + newString;
  });

  return newString;
}
