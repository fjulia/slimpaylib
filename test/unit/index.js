import slimpaylib from '../../src/slimpaylib';

describe('slimpaylib', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(slimpaylib, 'greet');
      slimpaylib.greet();
    });

    it('should have been run once', () => {
      expect(slimpaylib.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(slimpaylib.greet).to.have.always.returned('hello');
    });
  });
});
