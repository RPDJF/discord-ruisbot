// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "nosebleed",
    description: {
        en: "Experience a nosebleed.",
        fr: "Éprouver un saignement de nez."
    },
    usage: "nosebleed",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `${msg.author} experiences a sudden nosebleed! :nosebleed:`,
                `Blood rushes out of ${msg.author}'s nose! :sweat_drops:`,
                `:sweat_drops: ${msg.author}'s nose starts bleeding unexpectedly! :nosebleed:`,
                `:nosebleed: ${msg.author} has a nosebleed out of nowhere!`,
                `${msg.author}'s nose starts bleeding! :sweat_drops:`,
                `:sweat_drops: Blood drips from ${msg.author}'s nose! :nosebleed:`
            ],
            fr: [
                `${msg.author} éprouve soudainement un saignement de nez ! :nosebleed:`,
                `Du sang coule du nez de ${msg.author} ! :sweat_drops:`,
                `:sweat_drops: Le nez de ${msg.author} se met à saigner de manière inattendue ! :nosebleed:`,
                `:nosebleed: ${msg.author} a un saignement de nez sans raison apparente !`,
                `Le nez de ${msg.author} commence à saigner ! :sweat_drops:`,
                `:sweat_drops: Du sang coule du nez de ${msg.author} ! :nosebleed:`
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