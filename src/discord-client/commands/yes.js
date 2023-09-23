// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "yes",
    description: {
        en: "Say 'yes' enthusiastically.",
        fr: "Dire 'oui' avec enthousiasme."
    },
    usage: "yes",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `${msg.author} enthusiastically says 'yes'! :+1:`,
                `:+1: ${msg.author} agrees wholeheartedly and exclaims 'yes'! :blush:`,
                `${msg.author} shows approval with an enthusiastic 'yes'. :ok_hand:`,
                `${msg.author} is totally on board and says 'yes' with excitement! :grinning:`,
                `:grinning: ${msg.author} gives an emphatic 'yes'! :+1:`,
                `${msg.author} nods and says 'yes' with enthusiasm! :ok_hand:`
            ],
            fr: [
                `${msg.author} dit 'oui' avec enthousiasme ! :+1:`,
                `:+1: ${msg.author} est totalement d'accord et s'exclame 'oui' ! :blush:`,
                `${msg.author} montre son approbation avec un 'oui' enthousiaste. :ok_hand:`,
                `${msg.author} est totalement partant et dit 'oui' avec enthousiasme ! :grinning:`,
                `:grinning: ${msg.author} donne un 'oui' catégorique ! :+1:`,
                `${msg.author} hoche la tête et dit 'oui' avec enthousiasme ! :ok_hand:`
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