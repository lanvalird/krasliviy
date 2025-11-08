import { StringBuilder } from "../../lib/utils/StringBuilder.js";

describe('StringBuilder', () => {
  it('should create a StringBuilder instance', () => {
    const sb = new StringBuilder('');
    expect(sb).toBeInstanceOf(StringBuilder);
  });

  it('should set the value of the StringBuilder', () => {
    const sb = new StringBuilder('');
    sb.value = 'Hello';
    expect(sb.value).toBe('Hello');
  });

  it('should append a value to the StringBuilder with default position', () => {
    const sb = new StringBuilder('Hello, ');
    sb.append('World!');
    expect(sb.value).toBe('Hello, World!');
  });

  it('should append to start a value to the StringBuilder', () => {
    const sb = new StringBuilder('World!');
    sb.append('Hello, ', 'start');
    expect(sb.value).toBe('Hello, World!');
  });

  it('should append to end a value to the StringBuilder', () => {
    const sb = new StringBuilder('test_user_');
    sb.append('123', 'end');
    expect(sb.value).toBe('test_user_123');
  });

  it('should append to end and to start a value to the StringBuilder via appendStart, appendEnd', () => {
    const sb = new StringBuilder('(_^_^_)');
    sb.appendStart('\\').appendEnd('/');
    expect(sb.value).toBe('\\(_^_^_)/');
  });

  it('should convert the StringBuilder to a string', () => {
    const sb = new StringBuilder('Hello, World!');
    expect(sb.toString()).toBe('Hello, World!');
  });
});
