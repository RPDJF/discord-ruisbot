// imports
const { Message } = require("discord.js");
const messages = require("../../modules/messages");
const botConf = require("../../../config/bot-conf");
const embedUtility = require("../../modules/embedUtility");

module.exports = {
  name: "invite",
  description: messages.data.commands.invite.description,
  usage: messages.data.commands.invite.usage,
  category: "misc",
  /**
   * @param {Message} msg
   * @param {Array} args
   */
  execute(msg, args) {
    msg
      .reply({
        embeds: embedUtility.message("invite", `${botConf.BOT_INVITE}`),
      })
      .catch((err) => {
        console.error(err);
        return 1;
      });
  },
};
