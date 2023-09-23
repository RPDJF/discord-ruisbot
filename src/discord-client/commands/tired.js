// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "tired",
    description: {
        en: "Express tiredness.",
        fr: "Exprimer la fatigue."
    },
    usage: "tired",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `${msg.author} looks tired and in need of rest. :weary:`,
                `:weary: ${msg.author} yawns, feeling exhausted. :sleepy:`,
                `${msg.author} is visibly tired and needs a break. :yawning_face:`,
                `${msg.author} could use a nap right now. :sleeping:`,
                `:sleeping: ${msg.author} is clearly fatigued. :yawning_face:`,
                `${msg.author} shows signs of exhaustion. :weary:`
            ],
            fr: [
                `${msg.author} a l'air fatigué et a besoin de se reposer. :weary:`,
                `:weary: ${msg.author} baille, se sentant épuisé. :sleepy:`,
                `${msg.author} est visiblement fatigué et a besoin d'une pause. :yawning_face:`,
                `${msg.author} pourrait bien faire une sieste en ce moment. :sleeping:`,
                `:sleeping: ${msg.author} est clairement fatigué. :yawning_face:`,
                `${msg.author} montre des signes d'épuisement. :weary:`
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