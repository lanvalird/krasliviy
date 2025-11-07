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
   * You are need use appendStart and appendEnd methods.
   *
   * @deprecated
   */
  public append(
    value: string,
    position: "start" | "end" = "end"
  ): StringBuilder {
    if (position === "start") {
      this.appendStart(value);
    } else {
      this.appendEnd(value);
    }

    return this;
  }

  public appendStart(value: string): StringBuilder {
    this.value = value + this.value;
    return this;
  }
  public appendEnd(value: string): StringBuilder {
    this.value = this.value + value;
    return this;
  }

  public colorize(...colors: Colors[]): string {
    const newString = this.appendEnd(ANSI_RESET);
    colors.forEach((color) => {
      newString.appendStart(color);
    });

    return newString.toString();
  }

  public override toString(): string {
    return this.value;
  }
}
