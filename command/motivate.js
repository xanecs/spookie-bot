var gm = require('gm');
var fs = require('fs');

module.exports = function (api, message, args) {
  api.sendChatAction({
    chat_id: message.chat.id,
    action: 'upload_photo'
  });
  var quote = args.join(' ');
  var imgNum = Math.ceil(Math.random() * (12) + 1);
  gm(__dirname + '/../img/img-' + imgNum + '.jpg')
    .font(__dirname + '/../font/HelveticaNeue.ttf', 32)
    .fill('#ffffff')
    .drawText(0,0, quote, 'Center')
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
