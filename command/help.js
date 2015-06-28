module.exports = function (api, message, args) {
  api.sendMessage({
    chat_id: message.chat.id,
    text: 'I\'m under heavy development. Here\'s what I can do so far: \n\
    /spook - A spookie suprise\n\
    /plan - Give you the school schedule\n\
    /motivate <message> - Create a (badly drawn) motivational poster\n\
    /keepcalm <word1> <word2> - Create a KEEP CALM poster\n\
    /poke - Give you a warm-hearted poke\n\
    /translate <from> <to> <phrase> - Translate a phrase\n\
    /weather <location> - Current weather info'
  });
};
