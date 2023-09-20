// imports
const discord = require("discord.js");
const functions = require("./functions");
const jsnLangPack = require("../jsnLangPack.json");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
/**
 * 
 * @param {discord.Message} msg 
 * @param {string} lang 
 */
async function start(msg, args, lang) {
    try{
        // default author object
        const author ={
            name:"OpenAI",
            iconURL:"https://game-tournaments.com/media/logo/t25349.png",
            url:"https://openai.com/api/"
        }
        // generate image
        const response = openai.createImage({
            prompt: args[1],
            model: "openai-dall-e-2-0",
            n: 1,
            size: "512x512",
            user: msg.author.id,
        },{
            validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        });
        // reply that user has to wait
        const embed = new discord.EmbedBuilder()
        .setColor(require("../data/default_values").color)
        .setTitle(jsnLangPack[lang].draw.wait.title)
        .setDescription(jsnLangPack[lang].draw.wait.desc)
        .setTimestamp()
        .setThumbnail("https://i.ibb.co/t260PYk/ruisbot.gif")
        .setFooter({text: `Rui's Bot v${require("../package.json").version}`})
        .setAuthor(author);
        await msg.reply({embeds: [embed]});
        // execute after getting response
        response.then(async res =>{
            switch(res.status){
                case 200: //200 means ok
                    const embed = new discord.EmbedBuilder()
                        .setColor(require("../data/default_values").color)
                        .setTitle(args[1])
                        .setDescription(jsnLangPack[lang].draw.success.replace("{user}",`<@${msg.author.id}>`))
                        .setImage(res.data.data[0].url)
                        .setTimestamp()
                        .setThumbnail("https://i.ibb.co/t260PYk/ruisbot.gif")
                        .setFooter({text: `Rui's Bot v${require("../package.json").version}`})
                        .setAuthor(author);
                    try{
                        // for slash command support, otherwise it would crash
                        await msg.editReply({embeds: [embed]});
                    } catch(e){
                        await msg.reply({embeds: [embed]});
                    }
                    break;
                default: // if not 200, means error
                    await functions.embedReplyError(msg, await res.statusText, res.data.error.message, author);
                    break;

            }
        });
    } catch(e){
        console.log(e);
    }   
}
module.exports = {
    data: new discord.SlashCommandBuilder()
    .setName("draw")
    .setDescription("Generate original images")
    .addStringOption(option =>
        option.setName("what")
            .setRequired(true)
            .setDescription("Describe what to draw ?")),
    start
};
