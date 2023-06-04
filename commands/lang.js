// imports
const db = require("../db");
const dbGuilds = db.collection('guilds');
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
    const docGuild = dbGuilds.doc(msg.guildId);
    // change the language
    if (functions.checkAdminPrivilege(msg, lang)) {
        if (args.length != 2) {
            await msg.reply(jsnLangPack[lang].help.wusage);
            return;
        }
        switch (args[1]) {
            case "fr":
            case "en":
                if(args[1] !== lang)
                {
                    lang = args[1];
                    const success = `${jsnLangPack[lang].lang.success} \`\`${lang}\`\``;
                    await docGuild.set({ lang: lang }, { merge: true });
                    await msg.reply(success);
                    return {lang};
                } else{
                    const failure = jsnLangPack[lang].lang.same;
                    await functions.embedReplyError(msg, "Oh no !", failure
                        .replace("{lang}", lang));
                }
                break;
            default:
                const _undefined = jsnLangPack[lang].lang.undefined.replace("{lang}", args[1]);
                await msg.reply(_undefined);
                break;
        }
    }
}
// LANGS ARRAY
const aLang = [];
for(const key in jsnLangPack){
    aLang.push({
        name:jsnLangPack[key].value,
        value:key
    })
}
// NEW SLASH COMMAND BUILDER
let slashCommand = new discord.SlashCommandBuilder()
    .setName("lang")
    .setDescription("Change bot's language")
    .setDefaultMemberPermissions(discord.PermissionFlagsBits.ModerateMembers);
// ADD ACTIONS CHOICES
slashCommand = functions.slashCommandAddOptionWithChoices(slashCommand, "lang",`Langs showed in /help lang`,aLang,true);
// EXPORT SLASH COMMAND
module.exports = {
    data: slashCommand,
    start
};
