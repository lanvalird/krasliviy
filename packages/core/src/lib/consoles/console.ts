import type { Nothing, NotImplemented, Simple } from "src/types/utils.js";

import {
  ANSI_COLOR_BG_CODE,
  ANSI_COLOR_CODE,
  ANSI_RESET,
} from "../colors/index.js";

export const enum LogLevel {
  Log,
  Info,
  Warn,
  Error,
}

type ConsoleMessage = Simple | Array<Simple> | Nothing | unknown;

interface ConsoleParameters {
  classicParams?: unknown[];
  logLevel?: LogLevel;
  logPriority?: NotImplemented;
}

export class Console {
  constructor() {
    /* empty */
  }

  public print(message: ConsoleMessage, params: ConsoleParameters = {}) {
    const { classicParams = [], logLevel = LogLevel.Log } = params;

    switch (logLevel) {
      case LogLevel.Log:
        console.log(message, ...classicParams);
        break;

      case LogLevel.Info:
        console.info(message, ...classicParams);
        break;

      case LogLevel.Warn:
        console.warn(message, ...classicParams);
        break;

      case LogLevel.Error:
        console.error(
          ANSI_COLOR_BG_CODE.RED +
            ANSI_COLOR_CODE.WHITE +
            String(message) +
            ANSI_RESET,
          ...classicParams
        );
        break;
    }
  }
}
