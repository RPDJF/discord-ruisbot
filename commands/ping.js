// imports
const { SlashCommandBuilder } = require("discord.js");
const discord = require("discord.js");
/**
 * 
 * @param {discord.Message} msg 
 */

async function start(msg){
    await msg.reply("Pong!");
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    start
};