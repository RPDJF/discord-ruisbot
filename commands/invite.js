// imports
const { SlashCommandBuilder } = require("discord.js");
const discord = require("discord.js");
const functions = require("./functions");
const default_values = require("../data/default_values")
/**
 * 
 * @param {discord.Message} msg 
 */
async function start(msg){
    await functions.embedReply(msg, "Bot invite", undefined, `**URL**\n${default_values.bot_invite}`, "https://i.ibb.co/t260PYk/ruisbot.gif", undefined, default_values.bot_invite, undefined, undefined, undefined, undefined);
}
// Export slashcommand
module.exports = {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Returns invitation for bot"),
    start
};