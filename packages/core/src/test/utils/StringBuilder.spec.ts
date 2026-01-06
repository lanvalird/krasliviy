import { StringBuilder } from "../../lib/utils/StringBuilder.js";

describe("StringBuilder", () => {
  it("should create a StringBuilder instance", () => {
    const sb = new StringBuilder("");
    expect(sb).toBeInstanceOf(StringBuilder);
  });

  it("should set the value of the StringBuilder", () => {
    const sb = new StringBuilder("");
    sb.value = "Hello";
    expect(sb.value).toBe("Hello");
  });

  it("should append a value to the StringBuilder with default position", () => {
    const sb = new StringBuilder("Hello, ");
    sb.apply("World!");
    expect(sb.value).toBe("Hello, World!");
  });

  it("should append to start a value to the StringBuilder", () => {
    const sb = new StringBuilder("World!");
    sb.apply("Hello, ", "start");
    expect(sb.value).toBe("Hello, World!");
  });

  it("should append to end a value to the StringBuilder", () => {
    const sb = new StringBuilder("test_user_");
    sb.apply("123", "end");
    expect(sb.value).toBe("test_user_123");
  });

  it("should append to end and to start a value to the StringBuilder via unshift(), push()", () => {
    const sb = new StringBuilder("(_^_^_)");
    sb.unshift("\\").push("/");
    expect(sb.value).toBe("\\(_^_^_)/");
  });

  it("should convert the StringBuilder to a string", () => {
    const sb = new StringBuilder("Hello, World!");
    expect(sb.toString()).toBe("Hello, World!");
  });

  it("should be correct works to ", () => {
    const sb = new StringBuilder("Author: ")
      .applyWithRest("Valentin Bird", [0, 1])
      .apply(".");
    expect(sb.toString()).toBe("Author: V.");

    sb.applyWithRest("!@#$%^&*()_+", [3, 4], "start");
    expect(sb.toString()).toBe("$Author: V.");

    const sb2 = new StringBuilder("My favorite animal: ").applyWithRest(
      "Pseudocode №3 - cat",
      -3,
      "end"
    );
    expect(sb2.toString()).toBe("My favorite animal: cat");
  });
});
