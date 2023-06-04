// imports
const discord = require("discord.js");
const jsnLangPack = require("../jsnLangPack.json");
const ainasepics = require("ainasepics");
const weebPack = require("./settings/weebpack.json");
const functions = require("./functions");
const axios = require("axios");
const cheerio = require("cheerio");
const token = process.env.WAIFUIT_API_KEY;
const url = "https://waifu.it/api/"
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
    // select random user if needed
    if (select && (args[1] == "random" || args.length <= 1)) {
        const randomUser = await functions.getRandomUser(msg);
        args[1] = `<@${randomUser.id}>`;
        await weebpack(msg, args, lang, select);
        return;
    }
    // prepare the text
    let output = `${jsnLangPack[lang].weebpack[args[0]].emoji} ${jsnLangPack[lang].weebpack[args[0]].message[Math.floor(Math.random() * Object.keys(jsnLangPack[lang].weebpack[args[0]].message).length)]}`;
    output = output.replace("{user}", msg.author);

    if (select && args[1].charAt(0) != "<") {
        await msg.reply(jsnLangPack[lang].weebpack.error.mention);
        return;
    }
    
    if(select){
        // prepare the text
        output = output.replace("{target}", args[1]);
    }

    // get gif with waifu.it api
    axios.get(`${url}${args[0]}`, {
        headers: {
            Authorization: token,
        }
    })
        .then(async (response) => {
            let gifUrl = response.data.url;
    
            // check if the URL is a short link, discordjs embed doesn't support tenor shorts links
            const shortTenorLinkPattern = /^https:\/\/tenor\.com\/\w+\.gif$/;
            if (shortTenorLinkPattern.test(gifUrl)) {
                try {
                    const htmlResponse = await axios.get(gifUrl);
                    const $ = cheerio.load(htmlResponse.data);
    
                    // find and get content of the first <meta> tag with property="og:url", contains long link
                    const metaTags = $('meta[property="og:url"]');
                    if (metaTags.length > 0) {
                        const longLink = metaTags.eq(0).attr('content');
                        gifUrl = longLink;
                    }
                } catch (error) {
                    console.error('Error fetching HTML:', error);
                }
            }
    
            // add ".gif" extension if missing
            if (!gifUrl.endsWith('.gif')) {
                gifUrl += '.gif';
            }
    
            // send gif
            functions.embedReply(msg, undefined, undefined, output, gifUrl, undefined, undefined, undefined, "waifu.it", "https://waifu.it/", "https://waifu.it/public/favicon.ico");
        })
        .catch(error => console.error(error));
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