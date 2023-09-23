// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "stop",
    description: {
        en: "Stop in your tracks.",
        fr: "S'arrêter net."
    },
    usage: "stop",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `${msg.author} stops in their tracks. :stop_sign:`,
                `:stop_sign: ${msg.author} suddenly halts. :astonished:`,
                `${msg.author} comes to a sudden stop. :neutral_face:`,
                `${msg.author} freezes in place. :no_mouth:`,
                `:no_mouth: ${msg.author} stops abruptly. :astonished:`,
                `${msg.author} hits the brakes and stops. :stop_sign:`
            ],
            fr: [
                `${msg.author} s'arrête net. :stop_sign:`,
                `:stop_sign: ${msg.author} s'arrête brusquement. :astonished:`,
                `${msg.author} s'arrête soudainement. :neutral_face:`,
                `${msg.author} se fige sur place. :no_mouth:`,
                `:no_mouth: ${msg.author} s'arrête brusquement. :astonished:`,
                `${msg.author} freine et s'arrête. :stop_sign:`
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