// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "poke",
    description: {
        en: "Playfully poke someone.",
        fr: "Chatouiller quelqu'un de manière ludique."
    },
    usage: "poke <user|random>",
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
                `:point_right: ${msg.author} playfully pokes ${target}! :stuck_out_tongue_winking_eye:`,
                `${msg.author} pokes ${target} with a mischievous grin! :stuck_out_tongue_closed_eyes:`,
                `:stuck_out_tongue_winking_eye: ${msg.author} teases ${target} with a playful poke! :point_right:`,
                `${msg.author} and ${target} engage in a fun poking contest! :stuck_out_tongue_closed_eyes:`,
                `:point_right: ${msg.author} gives ${target} a friendly, playful poke! :stuck_out_tongue_winking_eye:`,
                `${msg.author} and ${target} exchange playful pokes in a fun interaction! :stuck_out_tongue_closed_eyes:`
            ],
            fr: [
                `:point_right: ${msg.author} chatouille de manière ludique ${target} ! :stuck_out_tongue_winking_eye:`,
                `${msg.author} chatouille ${target} avec un sourire malicieux ! :stuck_out_tongue_closed_eyes:`,
                `:stuck_out_tongue_winking_eye: ${msg.author} taquine ${target} avec une chatouille ludique ! :point_right:`,
                `${msg.author} et ${target} se lancent dans un concours de chatouilles amusant ! :stuck_out_tongue_closed_eyes:`,
                `:point_right: ${msg.author} donne à ${target} une chatouille amicale et ludique ! :stuck_out_tongue_winking_eye:`,
                `${msg.author} et ${target} échangent des chatouilles ludiques dans une interaction amusante ! :stuck_out_tongue_closed_eyes:`
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
