// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "cheers",
    description: {
        en: "Cheers with someone.",
        fr: "Trinquer avec quelqu'un."
    },
    usage: "cheers <user|random>",
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
                `:beers: ${msg.author} raises a glass and cheers with ${target}! :clinking_glasses:`,
                `${msg.author} and ${target} clink their glasses and cheer together! :beers:`,
                `:clinking_glasses: ${msg.author} and ${target} share a toast and cheer! :wine_glass:`,
                `${msg.author} toasts with ${target} and they both cheer! :tumbler_glass:`,
                `:beers: ${msg.author} and ${target} raise their drinks and cheer joyfully! :clinking_glasses:`,
                `:wine_glass: ${msg.author} and ${target} clink glasses and enjoy a cheerful toast! :beers:`
            ],
            fr: [
                `:beers: ${msg.author} lève un verre et trinque avec ${target} ! :clinking_glasses:`,
                `${msg.author} et ${target} trinquent et lèvent leurs verres ensemble ! :beers:`,
                `:clinking_glasses: ${msg.author} et ${target} font un toast et trinquent ! :wine_glass:`,
                `${msg.author} trinque avec ${target} et ils trinquent tous les deux ! :tumbler_glass:`,
                `:beers: ${msg.author} et ${target} lèvent leurs verres et trinquent joyeusement ! :clinking_glasses:`,
                `:wine_glass: ${msg.author} et ${target} trinquent et profitent d'un toast joyeux ! :beers:`
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