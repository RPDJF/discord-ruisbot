// imports
const {Message} = require("discord.js")

module.exports = {
    name: "dick",
    description: {
        en: "what are u expecting ?",
        fr: "à quoi tu t'attends ?"
    },
    usage: "dick",
    category: "fun",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    execute(msg, args) {
        const authorId = msg.author.id;
        const dSize = authorId[1] + authorId[4];
        const dRslt = "8" + "=".repeat(dSize) + ">";
        msg.reply(dRslt).catch((err) => {console.error(err); return (1)});
    },
  };