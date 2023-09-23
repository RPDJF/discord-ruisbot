// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "sleep",
    description: {
        en: "Take a nap or go to sleep.",
        fr: "Faire une sieste ou aller dormir."
    },
    usage: "sleep",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `${msg.author} takes a peaceful nap. :sleeping:`,
                `:sleeping: ${msg.author} decides it's time for a nap. :zzz:`,
                `${msg.author} peacefully drifts off to sleep. :sleepy:`,
                `${msg.author} takes a well-deserved rest. :relaxed:`,
                `:relaxed: ${msg.author} enjoys a relaxing nap. :sleeping:`,
                `${msg.author} decides it's nap time. :zzz:`
            ],
            fr: [
                `${msg.author} fait une sieste paisible. :sleeping:`,
                `:sleeping: ${msg.author} décide qu'il est temps de faire une sieste. :zzz:`,
                `${msg.author} s'endort paisiblement. :sleepy:`,
                `${msg.author} prend un repos bien mérité. :relaxed:`,
                `:relaxed: ${msg.author} profite d'une sieste relaxante. :sleeping:`,
                `${msg.author} décide qu'il est temps de faire une sieste. :zzz:`
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