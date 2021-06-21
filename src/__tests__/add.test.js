import { add } from '../services/add';

describe('add()', function() {
  it('should add two numbers', function() {
    expect(add(1,2)).toBe(3);
  });
});

