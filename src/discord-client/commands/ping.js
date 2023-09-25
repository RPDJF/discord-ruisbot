// imports
const { Message } = require("discord.js");
const messages = require("../../modules/messages");

module.exports = {
  name: "ping",
  description: messages.data.commands.ping.description,
  usage: messages.data.commands.ping.usage,
  category: "misc",
  /**
   * @param {Message} msg
   * @param {Array} args
   */
  execute(msg, args) {
    msg
      .reply("Pong!")
      .catch((err) => {
        console.error(err);
        return 1;
      })
      .catch((err) => {
        console.error(err);
        return 1;
      });
  },
};
