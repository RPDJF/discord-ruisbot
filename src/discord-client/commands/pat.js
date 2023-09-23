// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "pat",
    description: {
        en: "Pat someone gently.",
        fr: "Caresser doucement quelqu'un."
    },
    usage: "pat <user|random>",
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
                `:hand_splayed: ${msg.author} gently pats ${target}'s head with affection! :blush:`,
                `${msg.author} gives ${target} a tender pat on the back! :relaxed:`,
                `:relaxed: ${msg.author} caresses ${target} lovingly! :heart_eyes:`,
                `${msg.author} and ${target} enjoy a soft patting moment! :blush:`,
                `:hand_splayed: ${msg.author} and ${target} exchange gentle pats filled with warmth! :relaxed:`,
                `${msg.author} and ${target} share affectionate pats! :heart_eyes:`
            ],
            fr: [
                `:hand_splayed: ${msg.author} caresse doucement la tête de ${target} avec affection ! :blush:`,
                `${msg.author} donne à ${target} une caresse tendre dans le dos ! :relaxed:`,
                `:relaxed: ${msg.author} caresse ${target} avec amour ! :heart_eyes:`,
                `${msg.author} et ${target} profitent d'un moment de caresse douce ! :blush:`,
                `:hand_splayed: ${msg.author} et ${target} échangent des caresses douces emplies de chaleur ! :relaxed:`,
                `${msg.author} et ${target} se partagent des caresses affectueuses ! :heart_eyes:`
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