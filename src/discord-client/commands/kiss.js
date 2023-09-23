// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "kiss",
    description: {
        en: "kiss someone.",
        fr: "embrasser quelqu'un."
    },
    usage: "kiss <user|random>",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const target = args[1] || msg.guild.members.cache.random().user;
        const phrases = {
            en: [
                `:kissing_closed_eyes: ${msg.author} shares a sweet kiss with ${target}!`,
                `:heart_eyes: Passion ignites as ${msg.author} and ${target} lock lips!`,
                `:lips: Tender moments unfold as ${msg.author} kisses ${target} passionately!`,
                `:couplekiss: Love is in the air as ${msg.author} embraces ${target} in a passionate kiss!`,
                `:revolving_hearts: Hearts flutter as ${msg.author} and ${target} kiss under the starry sky!`,
                `:kiss: ${msg.author} leans in for a soft, romantic kiss with ${target}!`
            ],
            fr: [
                `:kissing_closed_eyes: ${msg.author} échange un doux baiser avec ${target} !`,
                `:heart_eyes: La passion s'enflamme lorsque ${msg.author} et ${target} se embrassent !`,
                `:lips: Des moments tendres se dévoilent lorsque ${msg.author} embrasse ${target} avec passion !`,
                `:couplekiss: L'amour est dans l'air lorsque ${msg.author} étreint ${target} dans un baiser passionné !`,
                `:revolving_hearts: Les cœurs papillonnent lorsque ${msg.author} et ${target} s'embrassent sous le ciel étoilé !`,
                `:kiss: ${msg.author} s'approche pour un baiser doux et romantique avec ${target} !`
            ]
        };        

        const randomIndex = Math.floor(Math.random() * phrases[guild.lang].length);
        const randomPhrase = phrases[guild.lang][randomIndex];

        const image = (await axios.get(`https://api.otakugifs.xyz/gif?reaction=${args[0]}`)).data;
        const embeds = embedUtility.short(randomPhrase);
        embeds[0].data.image = { url: image.url };

        msg.reply({ embeds }).catch((err) => {
            console.error(err);
            return(1);
        });
    },
};