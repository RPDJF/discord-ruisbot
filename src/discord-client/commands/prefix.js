// imports
const { Message, PermissionFlagsBits } = require("discord.js");
const { DEFAULT_PREFIX } = require("../../../config/bot-conf");
const db = require("../../modules/db");
const embedUtility = require("../../modules/embedUtility");
const messages = require("../../modules/messages");

module.exports = {
  name: "prefix",
  description: messages.data.commands.prefix.description,
  usage: messages.data.commands.prefix.usage,
  category: "configurations",
  permission: PermissionFlagsBits.Administrator,
  /**
   * @param {Message} msg
   * @param {Array} args
   */
  async execute(msg, args) {
    // Fetch guild data
    let guild = await db.getData("guilds", msg.guildId);

    // Check if args is empty
    if (args.length < 2) {
      switch (guild.lang) {
        case "fr":
          msg.channel
            .send({
              embeds: [
                embedUtility.message(
                  "préfixe actuel",
                  `Le préfixe du serveur est \`\`\`${guild.prefix}\`\`\``,
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
                  "current prefix",
                  `The server's prefix is \`\`\`${guild.prefix}\`\`\``,
                ),
              ],
            })
            .catch((err) => {
              console.error(err);
              return 1;
            });
          break;
      }
      return 0;
    }
    await db
      .writeData("guilds", msg.guildId, { prefix: args[1] })
      .catch((err) => {
        console.error(err);
        return 1;
      });
    guild = await db.getData("guilds", msg.guildId);
    switch (guild.lang) {
      case "fr":
        msg.channel
          .send({
            embeds: [
              embedUtility.message(
                "préfixe changé",
                `Le préfixe du serveur est \`\`\`${guild.prefix}\`\`\` désormais\nTu peux toujours utiliser \`\`\`${DEFAULT_PREFIX}prefix\`\`\` pour voir le préfixe actuel.`,
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
                "prefix changed",
                `The server's prefix is now \`\`\`${guild.prefix}\`\`\`\nYou can use \`\`\`${DEFAULT_PREFIX}prefix\`\`\` at any time to check current prefix.`,
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
