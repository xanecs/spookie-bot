var request = require('request');
var _ = require('underscore');

module.exports = function (api, message, args) {
  if (args.length < 3) {
    return api.sendMessage({
      chat_id: message.chat.id,
      text: '/translate <from> <to> <phrase>'
    });
  }
  api.sendChatAction({
    chat_id: message.chat.id,
    action: 'typing'
  });

  var fromLang = args.shift();
  var destLang = args.shift();
  var phrase = args.join(' ');

  request.get({
    url: 'https://glosbe.com/gapi/translate?from=' + fromLang + '&dest=' + destLang + '&format=json&phrase=' + encodeURIComponent(phrase),
    json: true
  }, function (err, res, body) {
    if (err) return console.log(err);
    if (res.statusCode !== 200) {
      return api.sendMessage({
        chat_id: message.chat.id,
        text: 'Something went wrong'
      });
    }
    var greeting = 'Here\'s what I\'ve found for \'' + phrase + '\'\n';
    var filtered = _.filter(body.tuc, function (item) { return !!item.phrase; });
    var results = _.map(filtered, function (result) {
      return '- ' + result.phrase.text;
    });
    api.sendMessage({
      chat_id: message.chat.id,
      text: greeting + results.join('\n')
    });
  });
};
