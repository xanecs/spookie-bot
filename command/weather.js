var request = require('request');
var _ = require('underscore');

module.exports = function (api, message, args) {
  if (args.length < 1) {
    return api.sendMessage({
      chat_id: message.chat.id,
      text: '/weather <location>'
    });
  }
  api.sendChatAction({
    chat_id: message.chat.id,
    action: 'typing'
  });

  var location = args.join(' ');

  request.get({
    url: 'http://api.openweathermap.org/data/2.5/weather?units=metric&q=' + encodeURIComponent(location),
    json: true
  }, function (err, res, body) {
    if (err) return console.log(err);
    if (res.statusCode !== 200 || body.cod !== 200) {
      return api.sendMessage({
        chat_id: message.chat.id,
        text: 'Something went wrong'
      });
    }
    api.sendMessage({
      chat_id: message.chat.id,
      text: '*poof* Back from \'' + body.name + '\'.\n' + body.weather[0].description + ' with about ' + body.main.temp + '°C'
    });
  });
};
