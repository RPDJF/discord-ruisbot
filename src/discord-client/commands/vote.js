// imports
const { Message } = require("discord.js");
const messages = require("../../modules/messages");
const { DISCORD_BOT_ID } = require("../../../config/discordjs-conf");
const embedUtility = require("../../modules/embedUtility");
const db = require("../../modules/db");

module.exports = {
  name: "vote",
  description: messages.data.commands.vote.description,
  usage: messages.data.commands.vote.usage,
  category: "misc",
  /**
   * @param {Message} msg
   * @param {Array} args
   */
  async execute(msg, args) {
    // Code to execute when command is run
    // Fetch guild data
    const guild = await db.getData("guilds", msg.guild.id);
    // Author
    const author = {
      name: "top.gg",
      iconURL: "https://top.gg/images/dblnew.png",
      url: "https://top.gg/",
    };

    const userData = await db
      .getData("users", msg.author.id)
      .catch(async (err) => {
        console.error(err);
        return 1;
      });

    // Get user last vote
    const lastVote = (() => {
      if (!userData) return 0;
      if (!userData.vote.date) return 0;
      let date;
      try {
        date = userData.vote.date.toDate();
      } catch (e) {
        date = new Date(userData.vote.date);
      }
      return date;
    })();

    // Check if last vote was 12 hours before
    // 43200000 milliseconds = 12 hours
    console.log(lastVote);
    if (Date.now() - lastVote < 43200000) {
      // Send message to user if last vote was less than 12 hours ago
      msg.channel.send({
        embeds: [
          embedUtility.message(
            "Vote top.gg",
            `${messages.data.commands.vote.replies.hasVoted.true[guild.lang]}\n
          ${messages.data.commands.vote.replies.doNotForgetToClaim[guild.lang]}`
              .replace("{prefix}", guild.prefix)
              // if time left is less than 1 hour, show minutes
              // 1 hour = 3600000 milliseconds
              .replace("{timeleft}", function () {
                // 43200000 milliseconds = 12 hours
                const timeleft = 43200000 - (Date.now() - lastVote);
                // 360000 milliseconds = 1 hour
                if (timeleft < 3600000) {
                  // if time left is less than 1 hour, show minutes
                  return `${Math.floor(timeleft / 60000)} ${
                    messages.data.system.time.minutes[guild.lang]
                  }`;
                } else {
                  // if time left is more than 1 hour, show hours
                  return `${Math.floor(timeleft / 3600000)} ${
                    messages.data.system.time.hours[guild.lang]
                  }`;
                }
              }),
            author,
          ),
        ],
      });
      return;
    } else {
      // Send message to user if last vote was more than 12 hours ago
      msg.channel.send({
        embeds: [
          embedUtility.message(
            "Vote top.gg",
            `${messages.data.commands.vote.replies.hasVoted.false[guild.lang]}\n
            [${
              messages.data.commands.vote.replies.voteNow[guild.lang]
            }](https://top.gg/bot/${DISCORD_BOT_ID}/vote)\n
            ${
              messages.data.commands.vote.replies.doNotForgetToClaim[guild.lang]
            }`.replace("{prefix}", guild.prefix),
            author,
          ),
        ],
      });
    }
  },
};
