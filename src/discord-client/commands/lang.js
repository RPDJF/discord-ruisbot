// imports
const { Message, PermissionFlagsBits } = require("discord.js");
const db = require("../../modules/db");
const embedUtility = require("../features/embedUtility");

module.exports = {
  name: "lang",
  description: {
    en: "change bot's language.",
    fr: "changer la langue du bot.",
  },
  usage: `lang <fr|en>`,
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
      embedUtility.genericWrongUsageMessage(msg, args, guild, this);
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
        msg
          .reply({
            embeds: embedUtility.message(
              "langue changée",
              `La langue du serveur est \`\`\`${guild.lang}\`\`\` désormais.`,
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
              "language changed",
              `The server's language is now \`\`\`${guild.lang}\`\`\``,
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
