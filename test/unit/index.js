import Slimpaylib from '../../src/index.js';

describe('slimpaylib', () => {
  describe('creator options', () => {
    it('fail if no contain options', () => {
      let func = () => {
        let sp = new Slimpaylib();
      }
      expect(func).to.throw(Error);
    });
    it('should fail if no contain options.app_name', () => {
      let func = () => {
        let options = {
          app_secret: 'democreditor01',
          creditor_reference: 'democreditor'
        };
        let sp = new Slimpaylib(options);

      }
      expect(func).to.throw(Error);
    });
    it('should fail if no contain options.app_secret', () => {
      let func = () => {
        let options = {
          app_name: 'democreditor01',
          creditor_reference: 'democreditor'
        };
        let sp = new Slimpaylib(options);
      }
      expect(func).to.throw(Error);
    });
    it('should fail if no contain options.creditor_reference', () => {
      let func = () => {
        let options = {
          app_name: 'democreditor01',
          app_secret: 'democreditor01'
        };
        let sp = new Slimpaylib(options);
      }
      expect(func).to.throw(Error);
    });
  });
  /*describe('Greet function', () => {
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
  });*/
});
