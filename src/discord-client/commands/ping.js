// imports
const {Message} = require("discord.js")

module.exports = {
    name: "ping",
    description: {
        en: "check the bot's ping to the server.",
        fr: "vérifie que le bot répond au serveur."
    },
    usage: "ping",
    category: undefined,
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    execute(msg, args) {
      msg.reply("Pong!").catch((err) => {console.error(err); return (1);});
    },
  };