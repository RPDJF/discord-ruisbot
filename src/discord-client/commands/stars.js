// imports
const { Message } = require("discord.js");
const messages = require("../../modules/messages");
const db = require("../../modules/db");
const embedUtility = require("../../modules/embedUtility");

async function exchange(guild, user, args, msg) {
  // initialize variables
  let embed;
  switch (args[2]) {
    case "gpt":
      if (user.vote.stars < 1) {
        // Not enough stars
        return embedUtility.errorMessage(
          messages.data.commands.stars.replies.exchange.gpt.error.notEnoughStars
            .title[guild.lang],
          messages.data.commands.stars.replies.exchange.gpt.error.notEnoughStars.description[
            guild.lang
          ].replace("{prefix}", guild.prefix),
        );
      }
      // Initialize variables
      const nbTokens = 10;
      // Generate new data
      const newData = user;
      newData.vote.stars -= 1; // decrement stars
      newData.openai.tokens
        ? (newData.openai.tokens += nbTokens)
        : (newData.openai.tokens = nbTokens); // increment tokens

      // Write data
      await db.writeData("users", msg.author.id, newData).catch((err) => {
        console.error(err);
        return 1;
      });

      // Return embed
      embed = embedUtility.message(
        messages.data.commands.stars.replies.exchange.gpt.success.title[
          guild.lang
        ],
        messages.data.commands.stars.replies.exchange.gpt.success.description[
          guild.lang
        ]
          .replace("{tokens}", nbTokens)
          .replace("{tokensLeft}", newData.openai.tokens),
      );
  }
  // Return embeds
  return embed;
}

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
    // Initialize variables
    const embeds = [];
    // Fetch guild data
    const guild = await db.getData("guilds", msg.guild.id).catch((err) => {
      console.error(err);
      return 1;
    });
    // Fetch user data
    const user = await db.getData("users", msg.author.id).catch((err) => {
      console.error(err);
      return 1;
    });
    // Get how many stars the user has
    const stars = (() => {
      if (!user) return 0;
      if (!user.vote) return 0;
      if (!user.vote.stars) return 0;
      else return user.vote.stars;
    })();

    // Check if subcommand
    if (args.length < 2) {
      // No subcommand
      // Build embeds reply
      embeds.push(
        embedUtility.message(
          `${messages.data.commands.stars.replies.title[guild.lang]}`,
          `${messages.data.commands.stars.replies.description[guild.lang]}`
            .replace("{stars}", stars)
            .replace("{usage[1]}", this.usage[1]),
        ),
      );
    } else {
      switch (args[1]) {
        case "exchange":
          // Generate embed
          const embed = await exchange(guild, user, args, msg);
          // Check if embed is valid
          if (embed && embed != 1) {
            // Push embed to embeds
            embeds.push(embed);
          } else {
            // Wrong usage detected
            embedUtility.genericWrongUsageMessage(msg, args, this);
            return; // exit
          }
          break;
        default:
          // Wrong usage detected
          embedUtility.genericWrongUsageMessage(msg, args, this);
          return; // exit
      }
    }
    // Send message to user
    await msg.channel
      .send({
        embeds: embeds,
      })
      .catch((err) => {
        console.error(err);
        return 1;
      });
  },
};
