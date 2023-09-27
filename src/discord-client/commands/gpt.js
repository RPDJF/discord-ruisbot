// imports
const { Message, PermissionFlagsBits } = require("discord.js");
const embedUtility = require("../../modules/embedUtility");
const db = require("../../modules/db");
const messages = require("../../modules/messages");

module.exports = {
  name: "gpt",
  description: messages.data.commands.gpt.description,
  usage: messages.data.commands.gpt.usage,
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
      await embedUtility.genericWrongUsageMessage(msg, args, this);
      return 0;
    }
    let data;
    switch (args[1]) {
      case "enable":
      case "true":
      case "yes":
        data = {
          gpt: {
            status: true,
          },
        };
        break;
      case "disable":
      case "false":
      case "no":
        data = {
          gpt: {
            status: false,
          },
        };
        break;
    }
    await db.writeData("guilds", msg.guildId, data).catch((err) => {
      console.error(err);
      return 1;
    });
    switch (guild.lang) {
      case "fr":
        msg.channel
          .send({
            embeds: [
              embedUtility.message(
                `GPT4 est désormais ${args[1]}`,
                "La feature GPT4 est aussi utilisée pour la génération d'images.",
              ),
            ],
          })
          .catch((err) => {
            console.error(err);
            return 1;
          });
        break;
      default:
        msg.channel.send({
          embeds: [
            embedUtility.message(
              `GPT4 is now ${args[1]}`,
              "GPT4 feature is also used for AI image generation.",
            ),
          ],
        });
        break;
    }
  },
};
