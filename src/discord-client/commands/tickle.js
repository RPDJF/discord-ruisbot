// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "tickle",
    description: {
        en: "Playfully tickle someone.",
        fr: "Chatouiller quelqu'un de manière ludique."
    },
    usage: "tickle <user|random>",
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
                `:joy: ${msg.author} playfully tickles ${target}! :stuck_out_tongue_winking_eye:`,
                `${msg.author} tickles ${target} with a mischievous grin! :laughing:`,
                `:laughing: ${msg.author} teases ${target} with a playful tickle! :joy:`,
                `${msg.author} and ${target} have a fun tickling match! :stuck_out_tongue_closed_eyes:`,
                `:joy: ${msg.author} gives ${target} a friendly, playful tickle! :laughing:`,
                `${msg.author} and ${target} exchange playful tickles in a fun interaction! :stuck_out_tongue_winking_eye:`
            ],
            fr: [
                `:joy: ${msg.author} chatouille de manière ludique ${target} ! :stuck_out_tongue_winking_eye:`,
                `${msg.author} chatouille ${target} avec un sourire malicieux ! :laughing:`,
                `:laughing: ${msg.author} taquine ${target} avec une chatouille ludique ! :joy:`,
                `${msg.author} et ${target} s'amusent à se chatouiller joyeusement ! :stuck_out_tongue_closed_eyes:`,
                `:joy: ${msg.author} fait une chatouille amicale et ludique à ${target} ! :laughing:`,
                `${msg.author} et ${target} échangent des chatouilles ludiques dans une interaction amusante ! :stuck_out_tongue_winking_eye:`
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