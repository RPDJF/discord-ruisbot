// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "yawn",
    description: {
        en: "Yawn because you're tired.",
        fr: "Bailler parce que vous êtes fatigué."
    },
    usage: "yawn",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `${msg.author} yawns because they're feeling tired. :yawning_face:`,
                `:yawning_face: ${msg.author} can't help but yawn due to tiredness. :weary:`,
                `${msg.author} lets out a big yawn. :sleepy:`,
                `${msg.author} needs a nap and yawns. :zzz:`,
                `:zzz: ${msg.author} yawns as a sign of fatigue. :weary:`,
                `${msg.author} is visibly tired and yawns. :yawning_face:`
            ],
            fr: [
                `${msg.author} baille parce qu'il est fatigué. :yawning_face:`,
                `:yawning_face: ${msg.author} ne peut s'empêcher de bailler à cause de la fatigue. :weary:`,
                `${msg.author} pousse un grand bâillement. :sleepy:`,
                `${msg.author} a besoin d'une sieste et baille. :zzz:`,
                `:zzz: ${msg.author} baille en signe de fatigue. :weary:`,
                `${msg.author} est visiblement fatigué et baille. :yawning_face:`
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