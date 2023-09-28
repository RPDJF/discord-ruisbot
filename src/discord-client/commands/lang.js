// imports
const { Message, PermissionFlagsBits } = require("discord.js");
const db = require("../../modules/db");
const embedUtility = require("../../modules/embedUtility");
const messages = require("../../modules/messages");

module.exports = {
  name: "lang",
  description: messages.data.commands.lang.description,
  usage: messages.data.commands.lang.usage,
  category: "configurations",
  permission: PermissionFlagsBits.Administrator,
  /**
   * @param {Message} msg
   * @param {Array} args
   */
  async execute(msg, args) {
    let guild = await db.getData("guilds", msg.guildId);
    if (!msg.member.permissions.has(PermissionFlagsBits.Administrator)) {
      embedUtility.genericPermissionMessage(msg, guild);
      return 0;
    }
    if (args.length < 2) {
      await embedUtility.genericWrongUsageMessage(msg, args, this);
      return 0;
    }
    if (args[1] == "fr" || args[1] == "en")
      await db
        .writeData("guilds", msg.guildId, { lang: args[1] })
        .catch((err) => {
          console.error(err);
          return 1;
        });
    else return 1;
    guild = await db.getData("guilds", msg.guildId);
    switch (guild.lang) {
      case "fr":
        msg.channel
          .send({
            embeds: [
              embedUtility.message(
                "langue changée",
                `La langue du serveur est \`\`\`${guild.lang}\`\`\` désormais.`,
              ),
            ],
          })
          .catch((err) => {
            console.error(err);
            return 1;
          });
        break;
      default:
        msg.channel
          .send({
            embeds: [
              embedUtility.message(
                "language changed",
                `The server's language is now \`\`\`${guild.lang}\`\`\``,
              ),
            ],
          })
          .catch((err) => {
            console.error(err);
            return 1;
          });
        break;
    }
  },
};
