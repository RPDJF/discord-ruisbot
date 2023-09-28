// imports
const { Message } = require("discord.js");
const embedUtility = require("../../modules/embedUtility");
const {
  OPENAI_API_KEY,
  OPENAI_AUTHOR,
} = require("../../../config/openai-conf");
const { default: axios } = require("axios");
const db = require("../../modules/db");
const messages = require("../../modules/messages");
const { DiscordEmbedsPaginator } = require("../../modules/paginator");

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
    // Number of pictures
    const nbPictures = 3;
    // Get the query, remove first element then join the rest
    const argsCopy = [...args];
    const query = (() => {
      args.shift();
      return args.join(" ");
    })();
    args = argsCopy;
    // Check if query is empty
    if (!query) {
      await embedUtility.genericWrongUsageMessage(msg, args, this);
      return 0;
    }
    // Check if arguments are empty
    if (args.length === 0) {
      embedUtility.genericWrongUsageMessage(msg, args, this);
      return 0;
    }

    // Send request to OpenAI API
    try {
      const response = await axios
        .post(
          "https://api.openai.com/v1/images/generations",
          {
            prompt: query,
            n: nbPictures,
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
      const embeds = [];
      let i = 0;
      for (const picture in response.data.data)
        embeds.push(
          embedUtility.imageMessage(
            query,
            `${msg.author}\n📷 **${++i}/${nbPictures}**`,
            response.data.data[picture].url,
            OPENAI_AUTHOR,
          ),
        );
      // create paginator
      const paginator = new DiscordEmbedsPaginator([], {
        customEmbeds: embeds,
      });
      // send paginator
      await paginator.createPaginatorMessage(msg.channel).catch((err) => {
        console.error(err);
        return 1;
      });
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
      return 1;
    }
  },
};
