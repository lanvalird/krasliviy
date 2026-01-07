import { ClassicConsole } from "../../lib/consoles/classic-console.js";
import { Console as NativeConsole } from "node:console";

describe("ClassicConsole", () => {
  it("object are instance of Console (node)", () => {
    const c = new ClassicConsole(process.stdout);
    expect(c).toBeInstanceOf(NativeConsole);
  });

  it("should call the log method with correct parameters", () => {
    const createdSpy = vi.spyOn(ClassicConsole.prototype, "log");

    const c = new ClassicConsole(process.stdout);
    const testData = "Log method!";

    c.log(testData);

    expect(createdSpy).toHaveBeenCalledOnce();
    expect(createdSpy).toHaveBeenCalledWith(testData);

    createdSpy.mockRestore();
  });
  it("should call the error method", () => {
    const createdSpy = vi.spyOn(ClassicConsole.prototype, "error");

    const c = new ClassicConsole(process.stdout);
    const testData = ["%s method!", "Error"];

    c.error(...testData);

    expect(createdSpy).toHaveBeenCalledOnce();
    expect(createdSpy).toHaveBeenCalledWith(...testData);

    createdSpy.mockRestore();
  });
});
