// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "cry",
    description: {
        en: "Express sadness and cry.",
        fr: "Exprimer la tristesse et pleurer."
    },
    usage: "cry",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `:cry: ${msg.author} expresses sadness and sheds tears. :sob:`,
                `${msg.author} is in tears, feeling heartbroken. :broken_heart:`,
                `:broken_heart: ${msg.author} cries and seeks comfort. :cry:`,
                `${msg.author} sheds a tear, feeling emotional. :sob:`,
                `:cry: ${msg.author} is overwhelmed with sorrow and cries. :broken_heart:`,
                `${msg.author} shows their sadness with a heartfelt cry. :sob:`
            ],
            fr: [
                `:cry: ${msg.author} exprime sa tristesse et verse des larmes. :sob:`,
                `${msg.author} est en larmes, se sentant le cœur brisé. :broken_heart:`,
                `:broken_heart: ${msg.author} pleure et cherche du réconfort. :cry:`,
                `${msg.author} verse une larme, se sentant émotionnel. :sob:`,
                `:cry: ${msg.author} est submergé de chagrin et pleure. :broken_heart:`,
                `${msg.author} montre sa tristesse avec un cri sincère. :sob:`
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