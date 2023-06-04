// imports
const discord = require("discord.js");
const jsnLangPack = require("../jsnLangPack.json");
const default_values = require("../data/default_values");
const functions = require("./functions");
const { SlashCommandStringOption } = require("discord.js");
/**
 * 
 * @param {discord.Message} msg 
 * @param {Array<string>} args 
 */
async function start(msg, args, lang) {
    let embed = new discord.EmbedBuilder()
        .setColor(default_values.color)
        .setTitle(jsnLangPack[lang].help.title)
        .setThumbnail(default_values.bot_icon)
        .setTimestamp()
        .setImage("https://i.stack.imgur.com/Fzh0w.png")
        .setFooter({ text: `Rui's Bot v${require("../package.json").version}` });
    // if no args
    if (args.length < 2) {
        for (const categories in jsnLangPack[lang].help.categories) {
            embed.addFields({
                name: `${jsnLangPack[lang].help.categories[categories]}`,
                value: `\`\`help ${categories}\`\``,
                inline: true
            });
        }
    } else {
        if (jsnLangPack[lang].help[args[1]] !== undefined) {
            const maxFields = 15;
            if (Object.keys(jsnLangPack[lang].help[args[1]]).length <= maxFields) {
                for (const _command in jsnLangPack[lang].help[args[1]]) {
                    embed.addFields({
                            name:`**${jsnLangPack[lang].help[args[1]][_command].command}**`,
                            value: `${jsnLangPack[lang].help[args[1]][_command].description}\n\`\`${jsnLangPack[lang].help[args[1]][_command].usage}\`\``,
                            inline: true
                        });
                    }
            } else {
                const maxPage = Math.floor(Object.keys(jsnLangPack[lang].help[args[1]]).length / maxFields);
                if (!Number.isFinite(Number.parseInt(args[2])) || args[2] < 1 || args[2] > maxPage) {
                    args[2] = 1;
                }
                for (let i = maxFields * (args[2] - 1); i < args[2] * maxFields; i++) {
                    if (jsnLangPack[lang].help[args[1]][i] === undefined) break;
                    embed.addFields({
                        name:`**${jsnLangPack[lang].help[args[1]][i].command}**`,
                        value:`${jsnLangPack[lang].help[args[1]][i].description}\n\`\`{jsnLangPack[lang].help[args[1]][i].usage}\`\``,
                        inline: true
                    });
                }
                embed.setDescription(jsnLangPack[lang].help.page.replace("{idxPage}", args[2]).replace("{page}", maxPage));
            }
        } else {
            await functions.embedReplyError(msg, "Wrong Usage", jsnLangPack[lang].help.wusage);
            return;
        }
    }
    await msg.reply({embeds: [embed]});
}
// CATEGORIES ARRAY
const categories = [];
for (const key in jsnLangPack["en"].help.categories) {
    categories.push({
        name:key,
        value:key
    });
}
//NEW SLASH COMMAND BUILDER
let data = new discord.SlashCommandBuilder()
    .setName("help")
    .setDescription("Display bot commands");
// ADD CATEGORIES CHOICES
data = functions.slashCommandAddOptionWithChoices(data, "category", `Categories showed in /help`, categories, false);
data.addIntegerOption(option =>
    option.setName("page")
        .setDescription("Page index"));
// EXPORTS DATA(slashcommandbuilder) AND START FUNCTION
module.exports = {
    data: data,
    start
};

