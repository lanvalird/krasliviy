import { Console as NativeConsole } from "node:console";

import {
  ANSI_COLOR_BG_CODE,
  ANSI_COLOR_CODE,
  ANSI_RESET,
} from "./colors/index.js";
import { StringBuilder } from "./utils/StringBuilder.js";

type ColorLists = typeof ANSI_COLOR_BG_CODE | typeof ANSI_COLOR_CODE;
type Colors = ColorLists[keyof ColorLists];

export class Console extends NativeConsole {
  protected static _icons: { [key: string[1]]: string } = {
    log: "",
    info: "?",
    warn: "!",
    error: "x",
  };

  constructor(
    stdout: NodeJS.WritableStream,
    stderr?: NodeJS.WritableStream,
    ignoreErrors?: boolean
  ) {
    super(stdout, stderr, ignoreErrors);
  }

  protected colorize(str: string, color: Colors): string {
    const newString = new StringBuilder(str)
      .appendStart(color)
      .appendEnd(ANSI_RESET)
      .toString();
    return newString;
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

  override error(message?: string, ...optionalParams: unknown[]): void {
    if (!message) {
      super.error(message, ...optionalParams);
      return;
    }

    message = this.colorize(
      this.colorize(message, ANSI_COLOR_CODE.WHITE),
      ANSI_COLOR_BG_CODE.RED
    );
    message = this.mountIcon(
      message,
      this.colorize(Console._icons["error"], ANSI_COLOR_CODE.RED)
    );

    super.error(message, ...optionalParams);
  }
}
