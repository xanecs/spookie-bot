var Telegram = require('./telegram.js');
var http = require('http');
var body = require('body/json');
var fs = require('fs');

var api = new Telegram({token: '112698501:AAGcWMcgdd7m1t8UAutnZqJMDhakvdb5noc'});

var webhookServer = http.createServer(function (req, res) {
  if (req.method != 'POST') {
    res.writeHead(200);
    return res.end("For Telegram Webhook only");
  }

  if (req.url != '/akjshdhdiuewzdjfnv') {
    res.writeHead(404);
    return res.end('');
  }
  body(req, res, function (err, body) {
    if (err) {
      console.log(err);
      res.writeHead(500);
      return res.end('');
    }
    res.writeHead(200);
    res.end('');

    if (!body.message.text) return;

    if (body.message.text.indexOf('@SpookieBot') !== -1) {
      return api.sendMessage({
        chat_id: body.message.chat.id,
        text: 'Huh, I\'ve heard my name! *spooks away*'
      });
    }

    if (body.message.text.indexOf('/') !== 0) {
      return api.sendMessage({
        chat_id: body.message.chat.id,
        text: 'Commands start with a \'/\'. \nType /help for a list of commands'
      });
    }

    var args = body.message.text.substring(1).split(' ');
    var fileName = './command/' + args.shift() + '.js';
    if (!fs.existsSync(fileName)) {
      return api.sendMessage({
        chat_id: body.message.chat.id,
        text: 'Command not recognized. \nType /help for a list of commands'
      });
    }

    require(fileName)(api, body.message, args);
  });
});

webhookServer.listen(8080);

api.setWebhook({
  url: 'https://spookie.leonadi.de/akjshdhdiuewzdjfnv'
}, function (err, data) {
  if (err) console.log(err);
});
