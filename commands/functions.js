// imports
const discord = require("discord.js");
const version = require("../package.json").version;
const jsnLangPack = require("../jsnLangPack.json");
const axios = require("axios");
const db = require("../db");
const { updateCacheUserData } = require("../data/cache");
/**
 * 
 * @param {discord.Message} msg 
 * @param {string} title 
 * @param {String} description 
 * @param {discord.EmbedAuthorOptions} author
 */
async function embedReplyError(msg, title, description, author){
    if(author === undefined){
        author = {
            name: "Rui's Bot",
            iconURL: "https://i.ibb.co/t260PYk/ruisbot.gif",
            url: "https://www.ruinformatique.ch"
        }
    }
    let output = new discord.EmbedBuilder()
        .setColor("#F55E41")
        .setTitle(title)
        .setDescription(`\`\`\`${description}\`\`\``)
        .setFooter({text: `Rui's Bot v${version}`})
        .setThumbnail("https://i.ibb.co/nCTjx74/AW3924521-07.gif")
        .setAuthor(author);
    try{
        await msg.reply({embeds: [output]});
    } catch(e){
        // slash command support
        await msg.editReply({embeds: [output]});
    }
}
async function embedReply(msg, title, color, description, image, footer, url, jsonFile, author, authorUrl, authorImg, thumbnail, attachment, lang) {
    // Default values if param undefined
    if (title === undefined) title = " ";
    if (color === undefined) color = require("../data/default_values").color;
    if (description === undefined) description = "";
    if (image === undefined) image = null;
    if (footer === undefined){
        footer = `Rui's Bot v${version}`;
    }else{
        footer += `\nRui's Bot v${version}`;
    };
    if (url === undefined) url = "https://www.ruinformatique.ch";
    // embed
    let output = new discord.EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setURL(url)
        .setDescription(description)
        .setThumbnail(thumbnail)
        .setImage(image)
        .setTimestamp()
        .setFooter({ text: footer });
    // add !help commands
    if (jsonFile !== undefined) {
        for (let i = 0; i < jsnLangPack[lang]
            .help.list.length; i++) {
            output.addField(jsnLangPack[lang].help.list[i].command, "``" + prefix + jsnLangPack[lang].help.list[i].usage +
                "``\n" + jsnLangPack[lang].help.list[i].description, true);
        }
    }
    if (authorImg !== undefined) {
        output.setAuthor({ name: author, url: authorUrl, iconURL: authorImg })
    } else if (author !== undefined) {
        output.setAuthor({ name: author, url: authorUrl });
    }
    // Display
    try{
        if (attachment !== undefined) {
            await msg.reply({ embeds: [output], files: [attachment] });
        }
        else {
            await msg.reply({ embeds: [output] });
        }
    } catch(e){
        if(e.status == 404){
            console.log(e);
            return;
        }
        // slash command support
        if (attachment !== undefined) {
            await msg.editReply({ embeds: [output], files: [attachment] });
        }
        else {
            await msg.editReply({ embeds: [output] });
            console.log("error")
            console.log(e);
        }
    }
    
}
/**
 * 
 * @param {discord.Message} msg 
 * @param {*} data
 */
function addUserData(msg, data){
    // firestore init
    const guildRef = db.collection("guilds");
    const guildDoc = guildRef.doc(msg.guildId);
    const userRef = guildDoc.collection("users");
    const userDoc = userRef.doc(msg.author.id);
    //register user score
    const update = userDoc.set(data, {merge: true});
    update.then(function(){
        updateCacheUserData(msg, data);
    });
}
/**
 * 
 * @param {discord.Message} msg 
 * @param {string} lang 
 * @returns {boolean} 
 */
function checkAdminPrivilege(msg, lang) {
    // define boolean isAdmin, used to check if user is admin
    const errorAdmin = jsnLangPack[lang].error.admin;
    let _isAdmin;
    try {
        _isAdmin = msg.member.permissions.has(discord.PermissionsBitField.StageModerator);
    }
    catch (e) {

    }
    if (_isAdmin === undefined) _isAdmin = false;
    if (!_isAdmin) embedReplyError(msg,"Moderator Privilege Required",errorAdmin);
    return _isAdmin;
}

// Get wanted GIF from Giphy free API
// Input : Query, search value
// Return json Giphy GIF object
/**
 * 
 * @param {string} query 
 * @returns {string}
 */
async function getGIF(query) {
    const res = await axios.get('https://api.giphy.com/v1/gifs/search', {
        params: {
            api_key: process.env.GIPHY_API_KEY,
            q: query,
            limit: 30
        }
    });
    const nbrGif = res.data.data.length;
    const rndIndex = Math.floor(Math.random() * nbrGif);
    const url = res.data.data[rndIndex];
    return (url);
}
// Get random user ID
// Input : msg context
// Return random discord.User from context
/**
 * 
 * @param {discord.Message} msg 
 * @return {discord.User}
 */
async function getRandomUser(msg){
    return((await msg.guild.members.fetch()).random());
}
// Dinamically add choices from json array
// Input :  discordSlashCommandBuilder()
//          optionName string
//          optionDesc string
//          choices array [{name: "name", value: "value"},{name: "name2", value: "value2"}]
//          isRequired ? boolean
// Return discordSlashCommandBuilder() with option
/**
 * 
 * @param {discord.SlashCommandBuilder} slashCommand 
 * @param {String} optionName
 * @param {String} optionDesc
 * @param {Array} aChoices
 * @param {Boolean} isRequired 
 * @returns 
 */
function slashCommandAddOptionWithChoices(slashCommand, optionName, optionDesc, aChoices, isRequired){
    // get current index
    let idx = slashCommand.options.length;
    // Create new option
    slashCommand.addStringOption(option =>
        option.setName(optionName)
            .setDescription(optionDesc)
            .setRequired(isRequired));
    // Add choices to last option
    // stop after 25 entries (max choices limit)
    let i = 0;
    aChoices.forEach(choice =>{
        if(i === 25) return;
        slashCommand.options[idx].addChoices(choice);
        i++;
    });
    return slashCommand;
}
module.exports = { embedReply, embedReplyError, addUserData, checkAdminPrivilege, getGIF, getRandomUser, slashCommandAddOptionWithChoices};