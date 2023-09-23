// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "love",
    description: {
        en: "Express love and affection.",
        fr: "Exprimer l'amour et l'affection."
    },
    usage: "love",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `:heart: ${msg.author} shares love and affection with everyone! :blush:`,
                `${msg.author} is filled with love and spreads it around! :heart_eyes:`,
                `:heart_eyes: ${msg.author} can't help but express their love! :heart:`,
                `${msg.author} showers everyone with love and warmth! :blush:`,
                `:blush: ${msg.author} is a beacon of love and affection! :heart:`,
                `${msg.author} can't contain their love and shares it with the world! :heart_eyes:`
            ],
            fr: [
                `:heart: ${msg.author} partage l'amour et l'affection avec tout le monde ! :blush:`,
                `${msg.author} est rempli d'amour et le propage ! :heart_eyes:`,
                `:heart_eyes: ${msg.author} ne peut s'empêcher d'exprimer son amour ! :heart:`,
                `${msg.author} inonde tout le monde d'amour et de chaleur ! :blush:`,
                `:blush: ${msg.author} est un phare d'amour et d'affection ! :heart:`,
                `${msg.author} ne peut contenir son amour et le partage avec le monde entier ! :heart_eyes:`
            ]
        };

        const randomIndex = Math.floor(Math.random() * phrases[guild.lang].length);
        const randomPhrase = phrases[guild.lang][randomIndex];

        const image = (await axios.get(`https://api.otakugifs.xyz/gif?reaction=${args[0]}`)).data;
        const embeds = embedUtility.short(randomPhrase);
        embeds[0].data.image = { url: image.url };

        msg.reply({ embeds }).catch((err) => {
            console.error(err);
            return (1);
        });
    },
};