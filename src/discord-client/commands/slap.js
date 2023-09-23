// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "slap",
    description: {
        en: "Playfully slap someone.",
        fr: "Gifler quelqu'un de manière ludique."
    },
    usage: "slap <user|random>",
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
                `:wave: ${msg.author} playfully slaps ${target}! :stuck_out_tongue_winking_eye:`,
                `${msg.author} slaps ${target} with a mischievous grin! :raised_hand:`,
                `:raised_hand: ${msg.author} teases ${target} with a playful slap! :wave:`,
                `${msg.author} and ${target} engage in a fun slapping contest! :stuck_out_tongue_closed_eyes:`,
                `:wave: ${msg.author} gives ${target} a friendly, playful slap! :raised_hand:`,
                `${msg.author} and ${target} exchange playful slaps in a fun interaction! :stuck_out_tongue_winking_eye:`
            ],
            fr: [
                `:wave: ${msg.author} gifle de manière ludique ${target} ! :stuck_out_tongue_winking_eye:`,
                `${msg.author} gifle ${target} avec un sourire malicieux ! :raised_hand:`,
                `:raised_hand: ${msg.author} taquine ${target} avec une gifle ludique ! :wave:`,
                `${msg.author} et ${target} se lancent dans un concours de gifles amusant ! :stuck_out_tongue_closed_eyes:`,
                `:wave: ${msg.author} donne à ${target} une gifle amicale et ludique ! :raised_hand:`,
                `${msg.author} et ${target} échangent des gifles ludiques dans une interaction amusante ! :stuck_out_tongue_winking_eye:`
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