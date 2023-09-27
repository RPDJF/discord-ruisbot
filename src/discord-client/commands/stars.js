// imports
const { Message } = require("discord.js");
const messages = require("../../modules/messages");
const db = require("../../modules/db");
const embedUtility = require("../../modules/embedUtility");

module.exports = {
  name: "stars",
  description: messages.data.commands.stars.description,
  usage: messages.data.commands.stars.usage,
  category: "misc",
  /**
   * @param {Message} msg
   * @param {Array} args
   */
  async execute(msg, args) {
    // Fetch guild data
    const guild = await db.getData("guilds", msg.guild.id).catch((err) => {
      console.error(err);
      return 1;
    });
    // Fetch user data
    const userData = await db.getData("users", msg.author.id).catch((err) => {
      console.error(err);
      return 1;
    });
    // Get how many stars the user has
    const stars = (() => {
      if (!userData) return 0;
      if (!userData.vote) return 0;
      if (!userData.vote.stars) return 0;
      else return userData.vote.stars;
    })();
    // Build embeds reply
    const embeds = [
      embedUtility.message(
        `${messages.data.commands.stars.replies.title[guild.lang]}`,
        `${
          messages.data.commands.stars.replies.description[guild.lang]
        }`.replace("{stars}", stars),
      ),
    ];
    // Send message to user
    msg
      .reply({
        embeds: embeds,
      })
      .catch((err) => {
        console.error(err);
        return 1;
      });
  },
};
