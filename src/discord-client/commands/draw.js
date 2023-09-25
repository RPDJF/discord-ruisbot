// imports
const { Message } = require("discord.js");
const embedUtility = require("../../modules/embedUtility");
const { OPENAI_API_KEY } = require("../../../config/openai-conf");
const { default: axios } = require("axios");
const db = require("../../modules/db");
const messages = require("../../modules/messages");

module.exports = {
  name: "draw",
  description: messages.data.commands.draw.description,
  usage: messages.data.commands.draw.usage,
  category: "fun",
  /**
   * @param {Message} msg
   * @param {Array} args
   */
  async execute(msg, args) {
    // Transforms arguments into an only string, removing command name
    args.shift();
    args = args.join(" ");
    // check if GPT is disabled
    const guild = await db.getData("guilds", msg.guildId);
    if (!(guild == undefined || guild.gpt == undefined || guild.gpt.status)) {
      embedUtility.genericDisabledOpenAIMessage(msg, guild);
      return 0;
    }
    // default author object
    const author = {
      name: "OpenAI",
      iconURL: "https://game-tournaments.com/media/logo/t25349.png",
      url: "https://openai.com/api/",
    };

    // Send request to OpenAI API
    try {
      const response = await axios
        .post(
          "https://api.openai.com/v1/images/generations",
          {
            prompt: args,
            n: 1,
            size: "512x512",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
          },
        )
        .catch((err) => {
          console.error(err);
          return 1;
        });
      // Return a message to the user
      const embed = embedUtility.imageMessage(
        args,
        `${msg.author}`,
        response.data.data[0].url,
        author,
      );
      msg.reply({ embeds: embed }).catch((err) => {
        console.error(err);
        return 1;
      });
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
      return 1;
    }
  },
};
