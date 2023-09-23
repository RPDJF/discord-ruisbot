// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "thumbsup",
    description: {
        en: "Give a thumbs-up.",
        fr: "Donner un pouce en l'air."
    },
    usage: "thumbsup",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `${msg.author} gives a thumbs-up! :+1:`,
                `:+1: ${msg.author} approves with a thumbs-up! :blush:`,
                `${msg.author} shows agreement with a thumbs-up. :ok_hand:`,
                `${msg.author} gives a positive thumbs-up! :grinning:`,
                `:grinning: ${msg.author} gives a big thumbs-up! :+1:`,
                `${msg.author} signals approval with a thumbs-up! :ok_hand:`
            ],
            fr: [
                `${msg.author} donne un pouce en l'air ! :+1:`,
                `:+1: ${msg.author} approuve d'un pouce en l'air ! :blush:`,
                `${msg.author} montre son accord avec un pouce en l'air. :ok_hand:`,
                `${msg.author} donne un pouce en l'air positif ! :grinning:`,
                `:grinning: ${msg.author} donne un gros pouce en l'air ! :+1:`,
                `${msg.author} signale son approbation avec un pouce en l'air ! :ok_hand:`
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