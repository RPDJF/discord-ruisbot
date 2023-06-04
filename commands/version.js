// imports
const { SlashCommandBuilder } = require("discord.js");
const discord = require("discord.js");
const functions = require("./functions");
const version = require("../package.json").version;
/**
 * 
 * @param {discord.Message} msg 
 */
async function start(msg){
    await functions.embedReply(msg, "Rui's Bot", undefined, `Version : v${version}`);
}
// Export slashcommand
module.exports = {
    data: new SlashCommandBuilder()
        .setName("version")
        .setDescription("Returns bot's version"),
    start
};