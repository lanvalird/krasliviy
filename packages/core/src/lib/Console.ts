import { Console as NativeConsole } from "node:console";

import { ANSI_COLOR_BG_CODE, ANSI_COLOR_CODE } from "./colors/index.js";

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

  override error(message?: string, ...optionalParams: unknown[]): void {
    const color = `${ANSI_COLOR_BG_CODE.RED}${ANSI_COLOR_CODE.WHITE}`;
    const icon = [
      ANSI_COLOR_CODE.RED,
      Console._icons["error"],
      ANSI_COLOR_CODE.RESET,
    ].join("");

    super.error(
      `${icon}${color} ${message} ${ANSI_COLOR_CODE.RESET}`,
      ...optionalParams
    );
  }
}
