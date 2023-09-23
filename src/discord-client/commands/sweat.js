// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "sweat",
    description: {
        en: "Sweat nervously.",
        fr: "Transpirer nerveusement."
    },
    usage: "sweat",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `${msg.author} sweats nervously. :sweat:`,
                `:sweat: ${msg.author} starts to perspire nervously. :grimacing:`,
                `${msg.author} is feeling the pressure and starts sweating. :cold_sweat:`,
                `${msg.author} feels nervous and sweaty. :confounded:`,
                `:confounded: ${msg.author} is in a sweaty situation. :grimacing:`,
                `${msg.author} nervously wipes their brow. :sweat:`
            ],
            fr: [
                `${msg.author} transpire nerveusement. :sweat:`,
                `:sweat: ${msg.author} commence à transpirer nerveusement. :grimacing:`,
                `${msg.author} ressent la pression et commence à transpirer. :cold_sweat:`,
                `${msg.author} se sent nerveux et en sueur. :confounded:`,
                `:confounded: ${msg.author} est dans une situation stressante. :grimacing:`,
                `${msg.author} essuie nerveusement son front. :sweat:`
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