import type { Nothing, NotImplemented, Simple } from "src/types/utils.js";

import { ANSI_COLOR_BG_CODE, ANSI_COLOR_CODE } from "../colors/index.js";
import { colorize } from "../utils/colorize.js";

export const enum LogLevel {
  Log,
  Info,
  Warn,
  Error,
}

type ConsoleMessage = Simple | Array<Simple> | Nothing | unknown;
type ConsoleParameters = Partial<{
  classicParams: unknown[];
  logLevel: LogLevel;
  logPriority: NotImplemented;
}>;

/**
 * The main class in this package.
 *
 * @since 0.0.1
 */
export class Console {
  constructor() {
    /* empty */
  }

  public print(
    message: ConsoleMessage,
    params: ConsoleParameters = { logLevel: LogLevel.Log }
  ) {
    const { classicParams, logLevel /* logPriority */ } = params;

    const newParams = [message, ...(classicParams ?? [])];

    switch (logLevel) {
      case LogLevel.Log:
        console.log(...newParams);
        break;

      case LogLevel.Info:
        console.info(...newParams);
        break;

      case LogLevel.Warn:
        console.warn(...newParams);
        break;

      case LogLevel.Error:
        console.error(
          colorize(
            message as string,
            ANSI_COLOR_BG_CODE.RED,
            ANSI_COLOR_CODE.WHITE
          ),
          ...newParams
        );
        break;

      default:
        throw "What? How you breack it?!";
    }
  }
}
