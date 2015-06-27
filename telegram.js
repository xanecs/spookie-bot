var request = require('request');
var body = require('body/json');

var Telegram = function (params) {
  this.base = 'https://api.telegram.org/bot' + params.token + '/';
};

Telegram.prototype.getApi = function (command, done) {
  request.get({url: this.base + command, json: true}, function (err, response, body) {
    if (err) {
      if (done) {
        return done(err);
      }
      return;
    }
    if (!body.ok) {
      if (done) {
        return done(body);
      }
      return;
    }
    if (done) {
      return done(null, body.result);
    }
  });
};

Telegram.prototype.postApi = function (command, data, done) {
  request.post({url: this.base + command, form: data, json:true}, function (err, response, body) {
    if (err) {
      if (done) {
        return done(err);
      }
      return;
    }
    if (!body.ok) {
      if (done) {
        return done(body);
      }
      return;
    }
    if (done) {
      return done(null, body.result);
    }
  });
};

Telegram.prototype.fileApi = function (command, data, done) {
  request.post({url: this.base + command, formData: data}, function (err, response, rawBody) {
    var body;
    try {
      body = JSON.parse(rawBody);
    } catch (ex) {
      if (done) {
        return done(ex);
      }
      return;
    }
    if (err) {
      if (done) {
        return done(err);
      }
      return;
    }
    if (!body.ok) {
      if (done) {
        return done(body);
      }
      return;
    }
    if (done) {
      return done(null, body.result);
    }
  });
};

Telegram.prototype.getMe = function (done) {
  this.getApi('getMe', done);
};

Telegram.prototype.sendMessage = function (data, done) {
  this.postApi('sendMessage', data, done);
};

Telegram.prototype.sendPhoto = function (data, done) {
  this.fileApi('sendPhoto', data, done);
};

Telegram.prototype.sendChatAction = function (data, done) {
  this.postApi('sendChatAction', data, done);
};

Telegram.prototype.setWebhook = function (data, done) {
  this.postApi('setWebhook', data, done);
};

module.exports = Telegram;
