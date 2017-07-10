const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non string values', () => {
    var str = 123;
    var message = isRealString(str);

    expect(message).toBe(false);
  });
});


  describe('isRealString', () => {
    it('should reject string with spaces', () => {
      var str = '  ';
      var message = isRealString(str);

      expect(message).toBe(false);

  });
});

  describe('isRealString', () => {
    it('should allow string values', () => {
      var str = 'sample';
      var message = isRealString(str);

      expect(message).toBe(true);

    });
});
