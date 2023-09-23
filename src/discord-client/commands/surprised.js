// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "surprised",
    description: {
        en: "Express surprise.",
        fr: "Exprimer la surprise."
    },
    usage: "surprised",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `${msg.author} looks surprised! :astonished:`,
                `:astonished: ${msg.author} can't believe their eyes! :open_mouth:`,
                `${msg.author} is taken aback and surprised. :open_mouth:`,
                `${msg.author} is in shock and awe! :scream:`,
                `:scream: ${msg.author} is caught off guard and surprised. :astonished:`,
                `${msg.author} expresses their surprise and amazement. :open_mouth:`
            ],
            fr: [
                `${msg.author} a l'air surpris ! :astonished:`,
                `:astonished: ${msg.author} n'en croit pas ses yeux ! :open_mouth:`,
                `${msg.author} est pris de court et surpris. :open_mouth:`,
                `${msg.author} est sous le choc et dans l'admiration ! :scream:`,
                `:scream: ${msg.author} est pris au dépourvu et surpris. :astonished:`,
                `${msg.author} exprime sa surprise et son émerveillement. :open_mouth:`
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