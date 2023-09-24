// imports
const { Message, PermissionFlagsBits } = require("discord.js");
const { DEFAULT_PREFIX } = require("../../../config/bot-conf");
const db = require("../../modules/db");
const embedUtility = require("../features/embedUtility");

module.exports = {
  name: "prefix",
  description: {
    en: "change bot's prefix.",
    fr: "changer le préfixe du bot.",
  },
  usage: `prefix <new>\`\` | \`\`${DEFAULT_PREFIX}prefix <new>`,
  category: "configurations",
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
      switch (guild.lang) {
        case "fr":
          msg
            .reply({
              embeds: embedUtility.message(
                "préfixe actuel",
                `Le préfixe du serveur est \`\`\`${guild.prefix}\`\`\``,
              ),
            })
            .catch((err) => {
              console.error(err);
              return 1;
            });
          break;
        default:
          msg
            .reply({
              embeds: embedUtility.message(
                "current prefix",
                `The server's prefix is \`\`\`${guild.prefix}\`\`\``,
              ),
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
        msg
          .reply({
            embeds: embedUtility.message(
              "préfixe changé",
              `Le préfixe du serveur est \`\`\`${guild.prefix}\`\`\` désormais\nTu peux toujours utiliser \`\`\`${DEFAULT_PREFIX}prefix\`\`\` pour voir le préfixe actuel.`,
            ),
          })
          .catch((err) => {
            console.error(err);
            return 1;
          });
        break;
      default:
        msg
          .reply({
            embeds: embedUtility.message(
              "prefix changed",
              `The server's prefix is now \`\`\`${guild.prefix}\`\`\`\nYou can use \`\`\`${DEFAULT_PREFIX}prefix\`\`\` at any time to check current prefix.`,
            ),
          })
          .catch((err) => {
            console.error(err);
            return 1;
          });
        break;
    }
  },
};
