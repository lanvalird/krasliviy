import { Console as NativeConsole } from "node:console";

import { ANSI_COLOR_CODE } from "../colors/index.js";

import { Console } from "./Console.js";
import { StringBuilder } from "../utils/StringBuilder.js";

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

  protected mountIcon(
    str: string,
    icon: string,
    position: "start" | "end" = "start"
  ): string {
    const newString = new StringBuilder(str)
      .apply(" ", position)
      .applyWithRest(` ${icon}`, [0, 2], position)
      .toString();
    return newString;
  }

  override log(message?: unknown, ...optionalParams: unknown[]): void {
    this.console.setClassicParams(optionalParams).print(message);
  }

  override error(message?: unknown, ...optionalParams: unknown[]): void {
    this.console.setClassicParams(optionalParams);

    if (!message) {
      this.console.print(message, { logType: "ERROR" });
      return;
    }

    let newMessage = message.toString();
    const iconColor = ANSI_COLOR_CODE.RED;
    const iconValue = ClassicConsole._icons["error"];
    const icon = new StringBuilder(iconValue).toString();
    newMessage = this.mountIcon(newMessage, icon);
    newMessage = new StringBuilder(newMessage).colorize(iconColor);

    this.console.print(newMessage, { logType: "ERROR" });
  }
}
