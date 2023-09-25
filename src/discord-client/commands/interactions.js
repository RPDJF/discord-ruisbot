// imports
const axios = require("axios");
const { Message, Collection } = require("discord.js");
const embedUtility = require("../../modules/embedUtility");
const db = require("../../modules/db");
const messages = require("../../modules/messages");

// data
// List of all availableActions and specific properties
const availableActions = [
  "angrystare",
  "blush",
  "brofist",
  "celebrate",
  "cheers",
  "confused",
  "cry",
  "cuddle",
  "dance",
  "evillaugh",
  "facepalm",
  "handhold",
  "happy",
  "hug",
  "kiss",
  "laugh",
  "lick",
  "love",
  "mad",
  "nervous",
  "no",
  "nom",
  "nosebleed",
  "nyah",
  "pat",
  "peek",
  "poke",
  "punch",
  "roll",
  "sad",
  "scared",
  "shy",
  "slap",
  "sleep",
  "smile",
  "sneeze",
  "sorry",
  "stop",
  "surprised",
  "sweat",
  "thumbsup",
  "tickle",
  "tired",
  "wave",
  "wink",
  "woah",
  "yawn",
  "yay",
  "yes",
];

module.exports = {
  category: "interaction",
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

    // Get the image from the API
    const image = (
      await axios.get(`https://api.otakugifs.xyz/gif?reaction=${args[0]}`)
    ).data;
    const embeds = embedUtility.short(
      messages.data.commands.interactions[args[0]].getAction[guild.lang](
        msg,
        target,
      ),
    );
    embeds[0].data.image = { url: image.url };

    // Send the message
    msg.reply({ embeds }).catch((err) => {
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
