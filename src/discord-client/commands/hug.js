// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "hug",
    description: {
        en: "hug someone.",
        fr: "prendre dans ses bras quelqu'un."
    },
    usage: "hug <user|random>",
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
                `:hugging: ${msg.author} gives a warm hug to ${target}!`,
                `:heart: Love and warmth fill the air as ${msg.author} hugs ${target} tightly!`,
                `:hug: ${msg.author} envelops ${target} in a comforting embrace!`,
                `:bear: ${msg.author} and ${target} share a bear hug full of affection!`,
                `:sparkling_heart: ${msg.author} and ${target} hug, creating a beautiful moment together!`,
                `:hug: ${msg.author} wraps their arms around ${target}, spreading positivity and love!`
            ],
            fr: [
                `:hugging: ${msg.author} offre un câlin chaleureux à ${target} !`,
                `:heart: L'amour et la chaleur remplissent l'air lorsque ${msg.author} serre ${target} dans ses bras !`,
                `:hug: ${msg.author} enlace ${target} dans une étreinte réconfortante !`,
                `:bear: ${msg.author} et ${target} partagent un gros câlin rempli d'affection !`,
                `:sparkling_heart: ${msg.author} et ${target} se serrent dans les bras, créant ainsi un moment magnifique !`,
                `:hug: ${msg.author} enlace ${target}, propageant ainsi la positivité et l'amour !`
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
