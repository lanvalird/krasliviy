import { Console as NativeConsole } from "node:console";

import { StringBuilder } from "@krasliviy/neo-strings";
import { Console, LogLevel } from "./console.js";

/**
 * An implementation of the native console class that uses the ANSI
 * escape codes to colorize the console output. And also adds an icon
 * to the console output. By the way, this class is a adapter for the
 * native console class via Console (this package).
 *
 * @since 0.0.1
 */
export class ClassicConsole extends NativeConsole {
  protected static _defaultIcons = {
    log: " ",
    info: "*",
    warn: "¤",
    error: "^",
  } as const;

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

  protected iconize(str: string): string {
    return new StringBuilder(" ").applyWithRest(str, [0, 1]).apply(" ").build();
  }

  protected applyIcon(message: unknown, icon: string) {
    return new StringBuilder(String(message))
      .apply(this.iconize(icon), "start")
      .build();
  }

  override log(message?: unknown, ...classicParams: unknown[]): void {
    this.console.print(
      this.applyIcon(message, ClassicConsole._defaultIcons.log),
      { classicParams: classicParams }
    );
  }

  override error(message?: unknown, ...classicParams: unknown[]): void {
    const params = {
      classicParams,
      logLevel: LogLevel.Error,
    };

    this.console.print(
      this.applyIcon(message, this.iconize(ClassicConsole._defaultIcons.error)),
      params
    );
  }
}
