import { ANSI_COLOR_BG_CODE, ANSI_COLOR_CODE } from "../colors/index.js";
import { StringBuilder } from "../utils/StringBuilder.js";

type LogType = "LOG" | "INFO" | "WARN" | "ERROR";

/**
 * The main class in this package.
 *
 * @since 0.0.1
 */
export class Console {
  private _classicParams: unknown[] = [];

  constructor() {
    /* empty */
  }

  /**
   * Set a parameters (options) for classic/native JS-console. Also,
   * it cleared via next call method `print()`.
   */
  public setClassicParams(classicParams: unknown[]) {
    this._classicParams = classicParams;
    return this;
  }
  public clearClassicParams() {
    this._classicParams = [];
    return this;
  }

  public print(
    message: unknown,
    params?: Partial<{
      logType: LogType;
    }>
  ) {
    const classicParams = this._classicParams;
    const newParams = [message, ...classicParams];
    this.clearClassicParams();

    if (!params || !params.logType) {
      console.log(...newParams);
      return;
    }

    switch (params.logType.toUpperCase()) {
      case "LOG":
        console.log(...newParams);
        break;

      case "INFO":
        console.info(...newParams);
        break;

      case "WARN":
        console.warn(...newParams);
        break;

      case "ERROR":
        console.error(...newParams);
        break;

      default:
        throw "What? How you breack it?!";
    }
  }

  public log(message: string) {
    this.print(message, { logType: "LOG" });
  }

  public printError(message: string) {
    const bgColor = ANSI_COLOR_BG_CODE.RED;
    const textColor = ANSI_COLOR_CODE.WHITE;
    const newMessage = new StringBuilder(message).colorize(bgColor, textColor);

    this.print(newMessage, { logType: "ERROR" });
  }
}
