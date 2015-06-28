var gm = require('gm');
var fs = require('fs');

module.exports = function (api, message, args) {
  api.sendChatAction({
    chat_id: message.chat.id,
    action: 'upload_photo'
  });
  var quote = args.join('\n');
  gm(__dirname + '/../img/keepcalm.jpg')
    .font(__dirname + '/../font/KeepCalm-Medium.ttf', 200)
    .fill('#ffffff')
    .drawText(0, 500, quote, 'Center')
    .quality(95)
    .write('/tmp/' + message.message_id + '.jpg', function (err) {
      if (err) return console.log(err);
      api.sendPhoto({
        chat_id: message.chat.id,
        photo: fs.createReadStream('/tmp/' + message.message_id + '.jpg')
      }, function (err, data) {
        if (err) return console.log(err);
      });
    });

};
