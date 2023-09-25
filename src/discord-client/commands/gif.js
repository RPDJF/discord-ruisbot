// imports
const { Message } = require("discord.js");
const messages = require("../../modules/messages");
const { default: axios } = require("axios");
const {
  TENOR_API_KEY,
  TENOR_API_URL,
  TENOR_RESULT_LIMIT,
} = require("../../../config/tenor-conf");
const embedUtility = require("../../modules/embedUtility");

module.exports = {
  name: "gif",
  description: messages.data.commands.gif.description,
  usage: messages.data.commands.gif.usage,
  category: "fun",
  /**
   * @param {Message} msg
   * @param {Array} args
   */
  async execute(msg, args) {
    // Get the query, remove first element then join the rest
    const query = (() => {
      args.shift();
      return args.join(" ");
    })();
    // Check if query is empty
    if (!query) {
      await embedUtility.genericWrongUsageMessage(msg, args, this);
      return 0;
    }
    const author = {
      name: "Tenor",
      iconURL: "https://tenor.com/assets/img/favicon/favicon-32x32.png",
      url: "https://tenor.com/",
    };
    // Get GIFs from Tenor API
    const response = await axios.get(TENOR_API_URL, {
      params: {
        key: TENOR_API_KEY,
        q: query,
        limit: TENOR_RESULT_LIMIT,
        media_filter: "basic",
      },
    });
    const gif =
      response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ];
    // Return a message to the user
    const embed = embedUtility.imageMessage(
      query,
      gif.content_description,
      gif.media_formats.gif.url,
      author,
    );
    msg.reply({ embeds: embed }).catch((err) => {
      console.error(err);
      return 1;
    });
  },
};
