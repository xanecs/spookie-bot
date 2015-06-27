var request = require('request');
var http = require('http');
var url = require('url');
var _ = require('underscore');

module.exports = function (api, message, args) {
  api.sendChatAction({
    chat_id: message.chat.id,
    action: 'upload_photo'
  });
  request.get({
    url: 'http://plan.leonadi.de/images',
    json: true,
    auth: {
      user: 'ente',
      password: 'quak'
    }
  }, function (err, res, body) {
    if (err) return console.log(err);
    _.each(body, function (currentUrl) {
      var imageUrl = url.parse(currentUrl);
      var imageReq = http.get({
        hostname: imageUrl.hostname,
        path: imageUrl.path,
        auth: 'ente:quak'
      }, function (res) {
        if (err) return console.log(err);
        api.sendPhoto({
          chat_id: message.chat.id,
          photo: res
        }, function (err, data) {
          if(err) return console.log(err);
        });
      });
    });
  });
};
