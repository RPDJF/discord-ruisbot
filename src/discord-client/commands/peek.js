// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "peek",
    description: {
        en: "Playfully peek at something or someone.",
        fr: "Jeter un coup d'œil joueur à quelque chose ou quelqu'un."
    },
    usage: "peek",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `${msg.author} playfully peeks at something or someone! :eyes:`,
                `:eyes: ${msg.author} sneakily takes a peek! :stuck_out_tongue_winking_eye:`,
                `${msg.author} can't resist a playful peek! :stuck_out_tongue:`,
                `${msg.author} playfully looks with curiosity! :eyes:`,
                `:stuck_out_tongue_winking_eye: ${msg.author} sneakily peeks at something or someone! :eyes:`,
                `${msg.author} can't help but peek playfully! :stuck_out_tongue:`
            ],
            fr: [
                `${msg.author} jette un coup d'œil joueur à quelque chose ou quelqu'un ! :eyes:`,
                `:eyes: ${msg.author} jette furtivement un coup d'œil ! :stuck_out_tongue_winking_eye:`,
                `${msg.author} ne peut résister à un coup d'œil joueur ! :stuck_out_tongue:`,
                `${msg.author} regarde avec curiosité de manière ludique ! :eyes:`,
                `:stuck_out_tongue_winking_eye: ${msg.author} jette furtivement un coup d'œil à quelque chose ou quelqu'un ! :eyes:`,
                `${msg.author} ne peut s'empêcher de jeter un coup d'œil joueur ! :stuck_out_tongue:`
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