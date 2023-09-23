// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "laugh",
    description: {
        en: "Express laughter and joy.",
        fr: "Exprimer le rire et la joie."
    },
    usage: "laugh",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `:joy: ${msg.author} bursts into laughter and can't stop! :grinning:`,
                `${msg.author} finds something hilarious and laughs out loud! :rofl:`,
                `:rofl: ${msg.author} can't contain their laughter! :joy:`,
                `${msg.author} shares a hearty laugh with everyone! :grinning:`,
                `:grinning: ${msg.author} laughs so hard they might cry! :joy:`,
                `${msg.author} can't help but laugh with pure joy! :rofl:`
            ],
            fr: [
                `:joy: ${msg.author} éclate de rire et ne peut s'arrêter ! :grinning:`,
                `${msg.author} trouve quelque chose de hilarant et rit à gorge déployée ! :rofl:`,
                `:rofl: ${msg.author} ne peut pas contenir son rire ! :joy:`,
                `${msg.author} partage un rire franc avec tout le monde ! :grinning:`,
                `:grinning: ${msg.author} rit tellement fort qu'il pourrait pleurer ! :joy:`,
                `${msg.author} ne peut s'empêcher de rire de joie ! :rofl:`
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