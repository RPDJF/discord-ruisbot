// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "nervous",
    description: {
        en: "Express nervousness or anxiety.",
        fr: "Exprimer la nervosité ou l'anxiété."
    },
    usage: "nervous",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `:worried: ${msg.author} is nervous and anxious! :cold_sweat:`,
                `${msg.author} can't help but feel jittery and anxious! :sweat:`,
                `:sweat: ${msg.author} expresses their nervousness and anxiety! :worried:`,
                `${msg.author} is on edge and it shows! :cold_sweat:`,
                `:cold_sweat: ${msg.author} is feeling anxious and can't hide it! :sweat:`,
                `${msg.author} shows their nervousness for all to see! :worried:`
            ],
            fr: [
                `:worried: ${msg.author} est nerveux et anxieux ! :cold_sweat:`,
                `${msg.author} ne peut s'empêcher de se sentir fébrile et anxieux ! :sweat:`,
                `:sweat: ${msg.author} exprime sa nervosité et son anxiété ! :worried:`,
                `${msg.author} est à cran et ça se voit ! :cold_sweat:`,
                `:cold_sweat: ${msg.author} se sent anxieux et ne peut le cacher ! :sweat:`,
                `${msg.author} montre sa nervosité pour que tout le monde le voie ! :worried:`
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