// imports
const { Message, Guild } = require("discord.js");
const messages = require("../../modules/messages");
const botConf = require("../../../config/bot-conf");
const embedUtility = require("../../modules/embedUtility");
const db = require("../../modules/db");

const commandMessage = messages.data.commands.invite;
module.exports = {
  name: "invite",
  description: messages.data.commands.invite.description,
  usage: messages.data.commands.invite.usage,
  category: "misc",
  /**
   * @param {Message} msg
   * @param {Array} args
   */
  async execute(msg, args) {
    const guild = await db.getData("guilds", msg.guildId).catch((err) => {
      console.error(err);
      return 1;
    });
    const fields = [
      {
        name: `${commandMessage.replies[guild.lang].botInvite}`,
        value: `:arrow_forward: [Click here](${botConf.BOT_INVITE})`,
        inline: true,
      },
      {
        name: `${commandMessage.replies[guild.lang].supportServer}`,
        value: `:arrow_forward: [Click here](${botConf.SERVER_SUPPORT_INVITE})`,
        inline: true,
      },
    ];
    msg.channel
      .send({
        embeds: [
          embedUtility.fieldsMessage(
            commandMessage.replies[guild.lang].title,
            commandMessage.replies[guild.lang].description,
            fields,
          ),
        ],
      })
      .catch((err) => {
        console.error(err);
        return 1;
      });
  },
};
