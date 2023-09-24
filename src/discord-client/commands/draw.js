// imports
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
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
    // generate image
    const prompt = args;
    const n = 1;
    const size = "512x512";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    };

    const data = {
      prompt,
      n,
      size,
    };

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        data,
        { headers },
      );
      const embed = embedUtility.message(args, `${msg.author}`, author)[0];
      embed.data.image = { url: await response.data.data[0].url };
      msg.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
      return 1;
    }
  },
};
