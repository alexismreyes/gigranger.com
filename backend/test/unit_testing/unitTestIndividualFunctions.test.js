const { sum } = require('../../utils/sum');

//HERE SHOULD INCLUDE TESTING FOR INDIVIDUAL FUNCTIONS
describe('Testing sum.js file for unit testing', () => {
  it('should summarize two numbers', () => {
    //arrange
    const num1 = 5;
    const num2 = 10;
    expectedResult = 15;

    //act
    const result = sum(num1, num2);

    //assert
    expect(result).toBe(15);
    expect(sum(40, 60)).toBe(100);
    expect(sum(10, 10)).toBe(20);
  });

  it('should properly summarize negative numbers', () => {
    //arrange
    const num1 = -5;
    const num2 = -10;
    const expectedResult = -15;

    //act
    const result = sum(num1, num2);

    //assert
    expect(result).toBe(expectedResult);
    expect(sum(-20, 20)).toBe(0);
  });

  it('Should validate arguments to be numbers', () => {
    //arrange
    const num1 = 'a';
    const num2 = 10;

    // Act & Assert (combined for error cases because .toThrow throws an error immediately)
    // the ()=> inside expect is only needed when you are testing whether a function throws an error.
    expect(() => sum(num1, num2).toThrow(TypeError));
    expect(() => sum(20, 'car').toThrow(TypeError));
    expect(() => sum('-', '&').toThrow(TypeError));
    expect(() => sum(undefined, null).toThrow(TypeError));
  });
});
