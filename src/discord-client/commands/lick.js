// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "lick",
    description: {
        en: "Playfully lick someone.",
        fr: "Lécher quelqu'un de manière ludique."
    },
    usage: "lick <user|random>",
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
                `:tongue: ${msg.author} playfully licks ${target}! :stuck_out_tongue_winking_eye:`,
                `${msg.author} gives ${target} a playful lick with a mischievous grin! :stuck_out_tongue_closed_eyes:`,
                `:stuck_out_tongue_winking_eye: ${msg.author} teases ${target} with a playful lick! :tongue:`,
                `${msg.author} and ${target} engage in a cheeky licking contest! :stuck_out_tongue_closed_eyes:`,
                `:tongue: ${msg.author} gives ${target} a friendly, playful lick! :stuck_out_tongue_winking_eye:`,
                `${msg.author} and ${target} exchange playful licks in a fun interaction! :stuck_out_tongue_closed_eyes:`
            ],
            fr: [
                `:tongue: ${msg.author} lèche de manière ludique ${target} ! :stuck_out_tongue_winking_eye:`,
                `${msg.author} donne à ${target} une petite léchouille ludique avec un sourire malicieux ! :stuck_out_tongue_closed_eyes:`,
                `:stuck_out_tongue_winking_eye: ${msg.author} taquine ${target} avec une léchouille ludique ! :tongue:`,
                `${msg.author} et ${target} se lancent dans un concours de léchouilles espiègles ! :stuck_out_tongue_closed_eyes:`,
                `:tongue: ${msg.author} fait une léchouille amicale et ludique à ${target} ! :stuck_out_tongue_winking_eye:`,
                `${msg.author} et ${target} échangent des léchouilles ludiques dans une interaction amusante ! :stuck_out_tongue_closed_eyes:`
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