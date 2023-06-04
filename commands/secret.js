// imports
const discord = require("discord.js");
/**
 * 
 * @param {discord.Message} msg 
 */
async function start(msg, args) {
    if (args.length > 1 && args[1] == "kodray") {
        switch (args[1]) {
            case "kodray":
                await msg.reply("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
                break;
        }
    }
}

module.exports = { start };