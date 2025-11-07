import { Console } from './Console.js';
import { Console as NativeConsole } from "node:console";


describe('Console', () => {
  it('object are instance of Console (local)', () => {
  const c = new Console(process.stdout);
    expect(c).toBeInstanceOf(Console);
  })
  it('object are instance of Console (node)', () => {
  const c = new Console(process.stdout);
    expect(c).toBeInstanceOf(NativeConsole);
  })

  it('should call the log method with correct parameters', () => {
    const createdSpy = vi.spyOn(Console.prototype, 'log');
    
    const c = new Console(process.stdout);
    const testData = "Log method!";

    c.log(testData);

    expect(createdSpy).toHaveBeenCalledOnce();
    expect(createdSpy).toHaveBeenCalledWith(testData);
    
    createdSpy.mockRestore();
  });
  it('should call the error method', () => {
    const createdSpy = vi.spyOn(Console.prototype, 'error');
    
    const c = new Console(process.stdout);
    const testData = "Error method!";

    c.error(testData);

    expect(createdSpy).toHaveBeenCalledOnce();
    expect(createdSpy).toHaveBeenCalledWith(testData);
    
    createdSpy.mockRestore();
  });
})
