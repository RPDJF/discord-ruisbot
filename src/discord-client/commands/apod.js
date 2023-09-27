// imports
const { Message } = require("discord.js");
const messages = require("../../modules/messages");
const { default: axios } = require("axios");
const { NASA_API_KEY } = require("../../../config/nasa-conf");
const embedUtility = require("../../modules/embedUtility");

module.exports = {
  name: "apod",
  description: messages.data.commands.apod.description,
  usage: messages.data.commands.apod.usage,
  category: "fun",
  /**
   * @param {Message} msg
   * @param {Array} args
   */
  async execute(msg, args) {
    // Code to execute when command is run
    const response = await axios
      .get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
      .catch((err) => {
        console.error(err);
        return 1;
      })
      .then((res) => {
        return res.data;
      });
    // Author of the embed
    const author = {
      name: "NASA",
      url: "https://www.nasa.gov/",
      iconURL:
        "https://cdn.freebiesupply.com/logos/large/2x/nasa-6-logo-png-transparent.png",
    };
    // Return a message to the user
    msg.channel
      .send({
        embeds: [
          embedUtility.imageMessage(
            response.title,
            response.date,
            response.hdurl,
            author,
          ),
        ],
      })
      .catch((err) => {
        console.error(err);
        return 1;
      });
  },
};
