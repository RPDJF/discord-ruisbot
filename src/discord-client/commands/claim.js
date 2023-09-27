// imports
const { Message } = require("discord.js");
const messages = require("../../modules/messages");
const db = require("../../modules/db");
const embedUtility = require("../../modules/embedUtility");

module.exports = {
  name: "claim",
  description: messages.data.commands.claim.description,
  usage: messages.data.commands.claim.usage,
  category: "misc",
  /**
   * @param {Message} msg
   * @param {Array} args
   */
  async execute(msg, args) {
    const guild = await db.getData("guilds", msg.guild.id).catch((err) => {
      console.error(err);
      return 1;
    });
    const userData = await db
      .getData("users", msg.author.id)
      .catch(async (err) => {
        console.error(err);
        return 1;
      });
    // Check if user has voted
    if (!userData || !userData.vote || !userData.vote.claim) {
      const embeds = [
        embedUtility.message(
          "Claims",
          `${messages.data.commands.claim.replies.hasNoClaims[guild.lang]}

        ${messages.data.commands.claim.replies.checkStars[guild.lang]}`.replace(
            "{prefix}",
            guild.prefix,
          ),
        ),
      ];
      msg.reply({
        embeds: embeds,
      });
    } else {
      await db
        .writeData("users", msg.author.id, {
          vote: {
            claim: false,
            stars:
              !userData || !userData.vote || !userData.vote.stars
                ? 1
                : userData.vote.stars + 1,
          },
        })
        .catch((err) => {
          console.error(err);
          return 1;
        });
      const embeds = [
        embedUtility.message(
          "Claims",
          `${messages.data.commands.claim.replies.hasClaims[guild.lang]}

        ${messages.data.commands.claim.replies.checkStars[guild.lang]}`.replace(
            "{prefix}",
            guild.prefix,
          ),
        ),
      ];
      msg.reply({
        embeds: embeds,
      });
    }
  },
};
