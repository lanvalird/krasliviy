import {
  ANSI_COLOR_BG_CODE,
  ANSI_COLOR_CODE,
  ANSI_RESET,
} from "../colors/index.js";

type ColorLists = typeof ANSI_COLOR_BG_CODE | typeof ANSI_COLOR_CODE;
type Colors = ColorLists[keyof ColorLists];

/**
 * @since 0.0.1
 */
export class StringBuilder extends String {
  private _value: string;

  constructor(value: string) {
    super();
    this._value = value;
  }

  public get value(): string {
    return this._value;
  }
  public set value(value: string) {
    this._value = value;
  }

  /**
   * Appends new substrings to the start or end of a string, and returns the StringBuilder.
   * @param items New substrings to add to the string.
   */
  public apply(
    items: string,
    position: "start" | "end" = "end"
  ): StringBuilder {
    if (position === "start") {
      this.unshift(items);
    } else {
      this.push(items);
    }

    return this;
  }

  /**
   * Appends new substring to the start or end of a parent, and returns the StringBuilder
   * @param value New string to add to the string
   * @param rest Index of resting applied string
   * 
   * @example
   * new StringBuilder("Author: ").applyWithRest("Valentin Bird", [0, 1]).apply(".")
   * // --> "Author: V."
   * new StringBuilder("Example with adding icon to the start").applyWithRest("!?", 1, "start")
   * // --> "!Example with adding icon to the start" 
   * new StringBuilder("My favorite animal: ").applyWithRest("Pseudocode №3 - cat", -3, "end")
   * // --> "My favorite animal: cat"
   */
  public applyWithRest(
    value: string,
    rest: number | [number, number],
        position: "start" | "end" = "end"
  ): StringBuilder {
    const arrayed = Array.isArray(rest);
    const rested = arrayed ? value.slice(...rest) : value.slice(rest);
this.apply(rested, position)

    return this;
  }

  /**
   * Appends new substrings to the start of a string, and returns the StringBuilder.
   * @param items New substrings to add to the string.
   */
  public unshift(items: string | string[]): StringBuilder {
    if (!Array.isArray(items)) {
      this.value = items + this.value;
      return this;
    }

    for (let i = 0; i < items.length; i++) {
      this.value = items + this.value;
    }
    return this;
  }

  /**
   * Appends new substrings to the end of a string, and returns the StringBuilder.
   * @param items New substrings to add to the string.
   */
  public push(items: string | string[]): StringBuilder {
    if (!Array.isArray(items)) {
      this.value = this.value + items;
      return this;
    }

    for (let i = 0; i < items.length; i++) {
      this.value = this.value + items;
    }
    return this;
  }

  public colorize(...colors: Colors[]): string {
    const newString = this.push(ANSI_RESET);
    colors.forEach((color) => {
      newString.unshift(color);
    });

    return newString.toString();
  }

  public override toString(): string {
    return this.value;
  }
}
