// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "wave",
    description: {
        en: "Wave to someone.",
        fr: "Saluer quelqu'un."
    },
    usage: "wave <user|random>",
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
                `:wave: ${msg.author} waves at ${target} with a friendly smile! :blush:`,
                `${msg.author} greets ${target} with a cheerful wave! :relaxed:`,
                `:relaxed: ${msg.author} shares a warm wave with ${target}! :heart_eyes:`,
                `${msg.author} and ${target} exchange friendly waves! :blush:`,
                `:wave: ${msg.author} and ${target} wave to each other with joy! :relaxed:`,
                `${msg.author} and ${target} share cheerful waves filled with positivity! :heart_eyes:`
            ],
            fr: [
                `:wave: ${msg.author} salue ${target} avec un sourire amical ! :blush:`,
                `${msg.author} accueille ${target} avec un salut joyeux ! :relaxed:`,
                `:relaxed: ${msg.author} partage un salut chaleureux avec ${target} ! :heart_eyes:`,
                `${msg.author} et ${target} échangent des saluts amicaux ! :blush:`,
                `:wave: ${msg.author} et ${target} se saluent mutuellement avec joie ! :relaxed:`,
                `${msg.author} et ${target} partagent des saluts joyeux emplis de positivité ! :heart_eyes:`
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