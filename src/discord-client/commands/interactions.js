// imports
const axios = require("axios");
const { Message, Collection } = require("discord.js");
const embedUtility = require("../../modules/embedUtility");
const db = require("../../modules/db");
const messages = require("../../modules/messages");

// data
// List of all availableActions and specific properties
const availableActions = [
  "bite",
  "blush",
  "bonk",
  "bully",
  "cuddle",
  "cringe",
  "cry",
  "dance",
  "handhold",
  "happy",
  "highfive",
  "hug",
  "kick",
  "kill",
  "kiss",
  "lick",
  "neko",
  "nom",
  "pat",
  "poke",
  "slap",
  "smile",
  "smug",
  "waifu",
  "wave",
  "wink",
  "yeet",
];

module.exports = {
  category: "interactions",
  hasMultipleCommands: true, // Will tell the bot to load all commands from getSubCommands() instead of this one
  /**
   * @param {Message} msg
   * @param {Array} args
   * @returns {Number}
   * 0: success
   * 1: error
   */
  async execute(msg, args) {
    // Get guild data
    const guild = await db.getData("guilds", msg.guildId);

    // If no user is specified, pick a random one
    const target = args[1] || msg.guild.members.cache.random().user;

    const author = {
      name: "waifu.pics",
      iconURL: "https://waifu.pics/favicon.png",
      url: "https://waifu.pics/",
    };

    // Get the image from the API
    const image = (await axios.get(`https://api.waifu.pics/sfw/${args[0]}`))
      .data;
    const embeds = [embedUtility.image(image.url, author)];

    // Send the message
    msg.channel
      .send({
        content: messages.data.commands.interactions[args[0]].getAction[
          guild.lang
        ](msg, target),
        embeds,
      })
      .catch((err) => {
        console.error(err);
        return 1;
      });
  },
  /**
   * @param {Message} msg
   * @returns {Collection}
   */
  getSubCommands() {
    // Get command metadata
    const commandMessages = messages.data.commands.interactions;

    const commands = {};
    // For each availableActions, add it to the list
    for (const action of availableActions) {
      commands[action] = {
        name: action,
        description: commandMessages[action].description,
        usage: commandMessages[action].usage,
        category: this.category,
        execute: this.execute,
      };
    }
    return commands;
  },
};
