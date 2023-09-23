// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "cuddle",
    description: {
        en: "Cuddle with someone.",
        fr: "Câliner quelqu'un."
    },
    usage: "cuddle <user|random>",
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
                `:two_hearts: ${msg.author} cuddles with ${target} affectionately! :hugging:`,
                `${msg.author} and ${target} share a warm and loving cuddle! :heart:`,
                `:hugging: ${msg.author} embraces ${target} in a tender cuddle! :two_hearts:`,
                `${msg.author} snuggles up to ${target} with care and love! :heart_eyes:`,
                `:two_hearts: ${msg.author} and ${target} hold each other close in a loving cuddle! :hugging:`,
                `:heart: ${msg.author} and ${target} enjoy a sweet and affectionate cuddle! :two_hearts:`
            ],
            fr: [
                `:two_hearts: ${msg.author} câline affectueusement ${target} ! :hugging:`,
                `${msg.author} et ${target} partagent un câlin chaleureux et affectueux ! :heart:`,
                `:hugging: ${msg.author} enlace tendrement ${target} ! :two_hearts:`,
                `${msg.author} se blottit contre ${target} avec soin et amour ! :heart_eyes:`,
                `:two_hearts: ${msg.author} et ${target} se serrent l'un contre l'autre dans un câlin affectueux ! :hugging:`,
                `:heart: ${msg.author} et ${target} profitent d'un câlin doux et affectueux ! :two_hearts:`
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