module.exports = function (api, message, args) {
  api.sendMessage({
    chat_id: message.chat.id,
    text: 'Hello, I\'m Spookie, a friendly ghost. How can I help you?'
  });
};
