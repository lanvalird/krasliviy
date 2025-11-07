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

  /** @deprecated */
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

  public override toString(): string {
    return this.value;
  }
}
