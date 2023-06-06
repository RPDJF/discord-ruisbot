// requires the "feeds" plugin by Banatawa (https://github.com/RPDJF/discord-ruisbot/tree/main/plugins/feeds)
// this command only register feeds channels
// the feeds plugin checks rss feeds in realtime and send new feeds to the registered feeds channels

// imports
const jsnLangPack = require("../jsnLangPack.json");
const discord = require("discord.js");
const functions = require("./functions");

/**
 * 
 * @param {discord.Message} msg 
 * @param {Array<string>} args 
 * @param {string} lang 
 * @returns {string}
 */
async function start(msg, args, lang){
    
    // check if user is admin
    if (functions.checkAdminPrivilege(msg, lang)) {
        // get the guild document
        const docGuild = dbGuilds.doc(msg.guildId);
        
        // check if command usage, requires 2 arguments
        if (args.length != 3) {
            await msg.reply(jsnLangPack[lang].help.wusage);
            return;
        }
    }
    // code
}

// NEW SLASH COMMAND BUILDER
let slashCommand = new discord.SlashCommandBuilder()
    .setName("feed")
    .setDescription("Manage feed channels")
    .setDefaultMemberPermissions(discord.PermissionFlagsBits.ModerateMembers);
// ADD ACTIONS CHOICES
// code
// EXPORT SLASH COMMAND
module.exports = {
    data: slashCommand,
    start
};