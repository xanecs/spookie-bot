module.exports = function (api, message, args) {
  api.sendMessage({
    chat_id: message.chat.id,
    text: 'I\'m under heavy development. Here\'s what I can do so far: \n/spook - A spookie suprise\n/plan - Give you the school schedule'
  });
};
