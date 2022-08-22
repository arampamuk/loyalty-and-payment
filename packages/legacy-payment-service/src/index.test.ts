import { handler } from '.';

describe('test', () => {
  it('should export a handler function', () => {
    expect(handler).toBeInstanceOf(Function);
  });
});
