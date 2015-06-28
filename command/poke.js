module.exports = function (api, message, args) {
  api.sendSticker({
    chat_id: message.chat.id,
    sticker: 'BQADAgADbgADGtlpBIswyr8Z8OW3Ag'
  });
};
