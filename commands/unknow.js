// imports
const discord = require("discord.js");
const jsnLangPack = require("../jsnLangPack.json");
/**
 * 
 * @param {discord.Message} msg 
 * @param {string} lang
 */
async function start(msg, lang, prefix){
    await msg.reply(`${jsnLangPack[lang].default} \`\`${prefix}help\`\` ?`);
}

module.exports = {start};