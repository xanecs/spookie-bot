module.exports = function (api, message, args) {
  api.sendMessage({
    chat_id: message.chat.id,
    text: 'BUH!'
  });
};
