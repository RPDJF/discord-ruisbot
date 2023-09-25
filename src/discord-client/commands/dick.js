// imports
const { Message } = require("discord.js");
const messages = require("../../modules/messages");

module.exports = {
  name: "dick",
  description: messages.data.commands.dick.description,
  usage: messages.data.commands.dick.usage,
  category: "fun",
  /**
   * @param {Message} msg
   * @param {Array} args
   */
  execute(msg, args) {
    const authorId = msg.author.id;
    const dSize = authorId[1] + authorId[4];
    const dRslt = "8" + "=".repeat(dSize) + ">";
    msg.channel.send(dRslt).catch((err) => {
      console.error(err);
      return 1;
    });
  },
};
