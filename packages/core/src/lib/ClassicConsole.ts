import type { Any } from "src/types/index.js";

import { Console as NativeConsole } from "node:console";

import {
  ANSI_COLOR_BG_CODE,
  ANSI_COLOR_CODE,
  ANSI_RESET,
} from "./colors/index.js";

import { Console } from "./Console.js";
import { StringBuilder } from "./utils/StringBuilder.js";

type ColorLists = typeof ANSI_COLOR_BG_CODE | typeof ANSI_COLOR_CODE;
type Colors = ColorLists[keyof ColorLists];

/**
 * An implementation of the native console class that uses the ANSI
 * escape codes to colorize the console output. And also adds an icon
 * to the console output. By the way, this class is a adapter for the
 * native console class via Console (this package).
 *
 * @since 0.0.1
 */
export class ClassicConsole extends NativeConsole {
  protected static _icons: { [key: string[1]]: string } = {
    log: "",
    info: "?",
    warn: "!",
    error: "x",
  };

  private _console: Console;

  constructor(
    stdout: NodeJS.WritableStream,
    stderr?: NodeJS.WritableStream,
    ignoreErrors?: boolean,
    console?: Console
  ) {
    super(stdout, stderr, ignoreErrors);

    if (console) {
      this._console = console;
      return this;
    }

    this._console = new Console();
    return this;
  }

  get console(): Console {
    return this._console;
  }

  protected colorize(str: string, ...colors: Colors[]): string {
    const newString = new StringBuilder(str).appendEnd(ANSI_RESET);
    colors.forEach((color) => {
      newString.appendStart(color);
    });

    return newString.toString();
  }

  protected mountIcon(
    str: string,
    icon: string,
    position: "start" | "end" = "start"
  ): string {
    const newString = new StringBuilder(str)
      .append(` ${icon} `, position)
      .toString();
    return newString;
  }

  override log(message?: Any, ...optionalParams: Any[]): void {
    this.console.print(message, { classicParams: optionalParams });
  }

  override error(message?: Any, ...optionalParams: unknown[]): void {
    if (!message) {
      super.error(message, ...optionalParams);
      return;
    }

    let newMessage = message.toString();

    const bgColor = ANSI_COLOR_BG_CODE.RED;
    const textColor = ANSI_COLOR_CODE.WHITE;
    newMessage = this.colorize(newMessage, bgColor, textColor);

    const icon = ClassicConsole._icons["error"];
    const iconColor = ANSI_COLOR_CODE.RED;
    newMessage = this.mountIcon(newMessage, this.colorize(icon, iconColor));

    super.error(newMessage, ...optionalParams);
  }
}
