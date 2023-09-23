// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "smile",
    description: {
        en: "Smile warmly.",
        fr: "Sourire chaleureusement."
    },
    usage: "smile",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `${msg.author} smiles warmly at everyone. :blush:`,
                `:blush: ${msg.author} can't help but smile warmly. :relaxed:`,
                `${msg.author} shares a friendly and warm smile. :smiley:`,
                `${msg.author} brightens up with a warm smile. :relaxed:`,
                `:relaxed: ${msg.author} can't resist smiling warmly. :blush:`,
                `${msg.author} grins warmly at the world. :smiley:`
            ],
            fr: [
                `${msg.author} sourit chaleureusement à tout le monde. :blush:`,
                `:blush: ${msg.author} ne peut s'empêcher de sourire chaleureusement. :relaxed:`,
                `${msg.author} partage un sourire amical et chaleureux. :smiley:`,
                `${msg.author} s'illumine d'un sourire chaleureux. :relaxed:`,
                `:relaxed: ${msg.author} ne peut résister à sourire chaleureusement. :blush:`,
                `${msg.author} sourit chaleureusement au monde entier. :smiley:`
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