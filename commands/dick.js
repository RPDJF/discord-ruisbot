// imports
const jsnLangPack = require("../jsnLangPack.json");
const discord = require("discord.js");
/**
 * 
 * @param {discord.Message} msg 
 * @param {string} lang 
 */
async function start(msg, lang) {
    try{
        const authorId = msg.author.id;
        const dSize = authorId[1] + authorId[4];
        const dRslt = "8" + "=".repeat(dSize) + ">";
        await msg.reply(jsnLangPack[lang].dick + dRslt);
    } catch(e){
        console.log(e);
    }   
}

module.exports = {data: new discord.SlashCommandBuilder()
    .setName("dick")
    .setDescription("Share your dick's size !"),
start};