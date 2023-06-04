// imports
const jsnLangPack = require("../jsnLangPack.json");
const default_values = require("../data/default_values");
const discord = require("discord.js");
const functions = require("./functions");
const db = require("../db");
const dbGuilds = db.collection('guilds');
/**
 * 
 * @param {discord.Message} msg 
 * @param {Array<string>} args 
 * @param {*} docGuild 
 * @param {string} lang 
 * @param {string} prefix 
 * @returns {string}
 */
async function start(msg, args, lang, prefix) {
    const docGuild = dbGuilds.doc(msg.guildId);
    if (args.length <= 1) {
        const actual = jsnLangPack[lang].prefix.actual;
        await functions.embedReply(msg, jsnLangPack[lang].prefix.title, undefined, actual.replace("{prefix}", prefix));
    } else {
        if (await functions.checkAdminPrivilege(msg, lang)) {
            // update docGuild only if new prefix is different from current prefix
            if(prefix !== args[1]){
                // set new prefix
                docGuild.set({prefix: args[1]}, { merge: true });
                prefix = args[1];
                const success = jsnLangPack[lang].prefix.success;
                await functions.embedReply(msg, jsnLangPack[lang].prefix.title, undefined, success
                    .replace("{prefix}", args[1])
                    .replace("{default_prefix}", default_values.prefix)
                    .replace("{default_prefix}", default_values.prefix));
                // return
                return {prefix};
            } else{
                // if prefix is the same
                const failure = jsnLangPack[lang].prefix.same;
                await functions.embedReplyError(msg, "Oh no !", failure
                    .replace("{prefix}", prefix));
            }
        }
    }
    return;
}
module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("prefix")
        .setDescription("Changes defalut bot's prefix")
        .setDefaultMemberPermissions(discord.PermissionFlagsBits.ModerateMembers)
        .addStringOption(option =>
            option.setName("prefix")
                .setDescription("Prefix the bot should use")),
    start
};