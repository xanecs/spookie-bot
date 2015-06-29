module.exports = function (api, message, args) {
  api.sendMessage({
    chat_id: message.chat.id,
    text: 'I like turtles *spooks away*'
  });
};
