import Auth from '../../src/auth.js';
var request = require('request');

describe('Auth', () => {
  describe('_is_token_valid function', () => {
    var options = {
      app_name: 'democreditor01',
      app_secret: 'demosecret01',
      oauth_url: 'http://localhost:5000'
    }

    it('should detect token is valid', () => {
      var auth = new Auth(options);
      auth.token = {
        access_token: '899a8019-328d-41bb-876a-980f1c768453',
        token_type: 'bearer',
        expires_in: 985,
        scope: 'api'
      }
      auth.renovation_date = new Date() / 1000;
      expect(auth._is_token_valid()).to.be.true;
    });

    it('should detect token is expired', () => {

      var auth = new Auth(options);
      auth.token = {
        access_token: '899a8019-328d-41bb-876a-980f1c768453',
        token_type: 'bearer',
        expires_in: -5,
        scope: 'api'
      }
      auth.renovation_date = new Date() / 1000;
      expect(auth._is_token_valid()).to.be.false;
    });
  });

  describe('getBearer function', () => {
    var options = {
      app_name: 'democreditor01',
      app_secret: 'demosecret01',
      oauth_url: 'http://localhost:5000'
    }
    var expectedToken = {
      access_token: '899a8019-328d-41bb-876a-980f1c768453',
      token_type: 'bearer',
      expires_in: 985,
      scope: 'api'
    };
    var auth;
    var post;

    beforeEach(function () {
      auth = new Auth(options);
      post = sinon.stub(request, 'post');
      post.yieldsOn(auth, null, null, expectedToken);
    });

    afterEach(function () {
      post.restore();
    });
    it('should retrieve and return token access', () => {
      var callback = sinon.spy();
      auth.getBearer(callback);
      sinon.assert.calledWith(callback, expectedToken.access_token);
    });
    
    it('should return stored token access', () => {
      var callback = sinon.spy();
      var auth = new Auth(options);
      auth.token = {
        access_token: '899a8019-328d-41bb-876a-980f1c768453',
        token_type: 'bearer',
        expires_in: 985,
        scope: 'api'
      }
      auth.getBearer(callback);
      sinon.assert.calledWith(callback, expectedToken.access_token);
    });
  });
});