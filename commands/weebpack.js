// imports
const discord = require("discord.js");
const jsnLangPack = require("../jsnLangPack.json");
const ainasepics = require("ainasepics");
const weebPack = require("./settings/weebpack.json");
const functions = require("./functions");
/**
 * 
 * @param {discord.Message<boolean>} msg 
 * @param {Array<string>} args 
 * @param {string} lang 
 * @returns {boolean}
 */
async function start(msg, args, lang) {
    try{
        // slashCommands converter
        if(msg.constructor.name === "ChatInputCommandInteraction"){
            args = [];
            args[0] = msg.options.data[0].value;
            if(msg.options.data[1] !== undefined) args[1] = `<@${msg.options.data[1].value}>`;
        }
        if (weebPack[args[0]] !== undefined) {
            if (weebPack[args[0]]) {
                await weebpack(msg, args, lang);
            } else {
                await weebpack(msg, args, lang, false);
            }
            return true;
        } else{
            return false;
        }
    } catch(e){
        console.log(e);
    }
}
// Proxy for using getGIF method over the "weebpack" commands
// Send the embed with the getGIF method by adding "anime" on the query
/**
 * 
 * @param {discord.Message<boolean>} msg 
 * @param {Array<string>} args 
 * @param {string} lang 
 * @param {boolean} select 
 * @returns 
 */
async function weebpack(msg, args, lang, select) {
    // determines if mentioning user is necessary
    if (select === undefined) select = true;
    // select random if needed
    if (select && (args[1] == "random" || args.length <= 1)) {
        const randomUser = await functions.getRandomUser(msg);
        args[1] = `<@${randomUser.id}>`;
        await weebpack(msg, args, lang, select);
        return;
    }
    if (!select) {
        // uses ainasepics to get gif
        let output = `${jsnLangPack[lang].weebpack[args[0]].emoji} ${jsnLangPack[lang].weebpack[args[0]].message[Math.floor(Math.random() * Object.keys(jsnLangPack[lang].weebpack[args[0]].message).length)]}`;
        output = output.replace("{user}", msg.author);
        ainasepics.get(args[0])
            .then(imageData => functions.embedReply(msg, undefined, undefined, output, imageData.url, undefined, undefined, undefined, "ainasepics", "https://www.npmjs.com/package/ainasepics", "https://www.logolynx.com/images/logolynx/7f/7fb976a537620fed310872d533cd161c.png"))
            .catch(error => console.log(error));
    } else if (select && args[1].charAt(0) != "<") {
        await msg.reply(jsnLangPack[lang].weebpack.error.mention);
    } else {
        // uses ainasepics to get gif
        let output = `${jsnLangPack[lang].weebpack[args[0]].emoji} ${jsnLangPack[lang].weebpack[args[0]].message[Math.floor(Math.random() * Object.keys(jsnLangPack[lang].weebpack[args[0]].message).length)]}`;
        output = (output.replace("{user}", msg.author)).replace("{target}", args[1]);
        ainasepics.get(args[0])
            .then(imageData => functions.embedReply(msg, undefined, undefined, output, imageData.url, undefined, undefined, undefined, "ainasepics", "https://www.npmjs.com/package/ainasepics", "https://www.logolynx.com/images/logolynx/7f/7fb976a537620fed310872d533cd161c.png"))
            .catch(error => console.log(error));
    }
}
// ACTIONS ARRAY
const aActions = [];
for(const key in weebPack){
    aActions.push({
        name:key,
        value:key
    });
}
// NEW SLASH COMMAND BUILDER
let slashCommand = new discord.SlashCommandBuilder()
    .setName("weebpack")
    .setDescription("Hug or slap any user");
// ADD ACTIONS CHOICES
slashCommand = functions.slashCommandAddOptionWithChoices(slashCommand, "action",`Actions showed in /help weebpack`,aActions,true);
slashCommand.addUserOption(option =>
    option.setName("user")
        .setDescription("Target action on this user"));
// EXPORT SLASH COMMAND
module.exports = {
    data: slashCommand,
    start
}