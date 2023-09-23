// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "nom",
    description: {
        en: "Nom on something playfully.",
        fr: "Mordiller quelque chose de manière ludique."
    },
    usage: "nom <object>",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const object = args[0] || "a snack";
        const phrases = {
            en: [
                `:yum: ${msg.author} playfully noms on ${object}! :stuck_out_tongue_closed_eyes:`,
                `${msg.author} enjoys a playful nibble on ${object}! :stuck_out_tongue_winking_eye:`,
                `:stuck_out_tongue_closed_eyes: ${msg.author} teases ${object} with playful nomming! :yum:`,
                `${msg.author} and ${object} share a fun nomming moment! :stuck_out_tongue_winking_eye:`,
                `:yum: ${msg.author} savors the taste of ${object} with playful noms! :stuck_out_tongue_closed_eyes:`,
                `${msg.author} and ${object} engage in some playful nomming action! :stuck_out_tongue_winking_eye:`
            ],
            fr: [
                `:yum: ${msg.author} mordille de manière ludique ${object} ! :stuck_out_tongue_closed_eyes:`,
                `${msg.author} se régale en grignotant ludiquement ${object} ! :stuck_out_tongue_winking_eye:`,
                `:stuck_out_tongue_closed_eyes: ${msg.author} taquine ${object} avec des mordillements ludiques ! :yum:`,
                `${msg.author} et ${object} partagent un moment de mordillement amusant ! :stuck_out_tongue_winking_eye:`,
                `:yum: ${msg.author} savoure le goût de ${object} avec des mordillements ludiques ! :stuck_out_tongue_closed_eyes:`,
                `${msg.author} et ${object} se livrent à des mordillements ludiques ! :stuck_out_tongue_winking_eye:`
            ]
        };        

        const randomIndex = Math.floor(Math.random() * phrases[guild.lang].length);
        const randomPhrase = phrases[guild.lang][randomIndex];

        const image = (await axios.get(`https://api.otakugifs.xyz/gif?reaction=${args[0]}`)).data;
        const embeds = embedUtility.short(randomPhrase);
        embeds[0].data.image = { url: image.url };

        msg.reply({ embeds }).catch((err) => {
            console.error(err);
            return(1);
        });
    },
};